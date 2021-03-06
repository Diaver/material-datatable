import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Tooltip from "@material-ui/core/Tooltip";
import {withStyles} from "@material-ui/core/styles";

const defaultHeadCellStyles = {
    root: {
    },
    tooltip: {
        cursor: "pointer",
    },
    mypopper: {
        "&[data-x-out-of-boundaries]": {
            display: "none",
        },
    },
    data: {
        display: "inline-block",
    },
    sortAction: {
        display: "inline-block",
        cursor: "pointer",
        paddingLeft: "4px",
        height: "10px",
    },
    sortActive: {
        color: "rgba(0, 0, 0, 0.87)",
    },
    toolButton: {
        height: "10px",
        outline: "none",
        cursor: "pointer",
    },
};

class MaterialDatatableHeadCell extends React.Component {
    static propTypes = {
        /** Extend the style applied to components */
        classes: PropTypes.object,
        /** Options used to describe table */
        options: PropTypes.object.isRequired,
        /** Current sort direction */
        sortDirection: PropTypes.string,
        /** Callback to trigger column sort */
        toggleSort: PropTypes.func.isRequired,
        /** Sort enabled / disabled for this column **/
        sort: PropTypes.bool.isRequired,
    };

    handleSortClick = () => {
        this.props.toggleSort(this.props.index);
    };

    render() {
        const {children, classes, options, sortDirection, sort, width, headerNoWrap} = this.props;
        const sortActive = sortDirection !== null && sortDirection !== undefined ? true : false;
        const sortLabelProps = {
            active: sortActive,
            ...(sortDirection ? {direction: sortDirection} : {}),
        };

        return (
            <TableCell
                className={classes.root}
                scope={"col"}
                style={{width: width, whiteSpace: headerNoWrap !== null && headerNoWrap === true ? "nowrap" : "normal"}}
                sortDirection={sortDirection}>
                {options.sort && sort ? (
                    <Tooltip
                        title={options.textLabels.body.toolTip}
                        placement={"bottom-end"}
                        enterDelay={300}
                        classes={{popper: classes.mypopper, tooltip: classes.tooltip}}>
            <span
                role="button"
                onKeyUp={() => {
                }}
                onClick={this.handleSortClick}
                className={classes.toolButton}
                tabIndex={0}>
              <div
                  className={classNames({
                      [classes.data]: true,
                      [classes.sortActive]: sortActive,
                  })}>
                {children}
              </div>
              <div className={classes.sortAction}>
                <TableSortLabel {...sortLabelProps} />
              </div>
            </span>
                    </Tooltip>
                ) : (
                    children
                )}
            </TableCell>
        );
    }
}

export default withStyles(defaultHeadCellStyles, {name: "MaterialDatatableHeadCell"})(MaterialDatatableHeadCell);
