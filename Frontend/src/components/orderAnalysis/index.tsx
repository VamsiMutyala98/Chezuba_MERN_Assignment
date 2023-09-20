import React, { FC, ReactElement } from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { ConnectedProps, connect } from "react-redux";
import { BarChart } from "../widgets/BarChart";
import { IRootState } from "../../store/types/base.type";
import { setOrderAnalysis } from "../../store/actions/base.action";
import { EOrderStatus, IOrderAnalysisParams } from "../../types/order.type";

Chart.register(CategoryScale);

interface IProps extends PropsFromRedux {}
const OrderAnalysis: FC<IProps> = ({ ...props }): ReactElement => {
  const [branchId, setBranchId] = React.useState<string>("");
  const [labels, setLabels] = React.useState<string[]>([]);
  const [columnData, setColumnData] = React.useState<number[]>([]);
  const [startDate, setStartDate] = React.useState<string>("");
  const [endDate, setEndDate] = React.useState<string>("");
  React.useEffect(() => {
    const params: IOrderAnalysisParams = {
      branchId,
      fromDate: startDate,
      endDate,
      status: EOrderStatus.DELIVERED,
    };
    props.setOrderAnalysis(params);
  }, [startDate, endDate, branchId]);

  React.useEffect(() => {
    if (props.orderAnalysis?.length) {
      setLabels(props.orderAnalysis.map((oDetails) => oDetails.type));
      setColumnData(props.orderAnalysis.map((oDetails) => oDetails.totalPrice));
    } else {
      setLabels([]);
      setColumnData([]);
    }
  }, [props.orderAnalysis]);

  const MemoizedMyComponent = React.memo(BarChart);
  return (
    <div className="row" style={{ padding: "10px 100px" }}>
      <div className="form-group col-xs-3 col-sm-3 col-lg-3 col-md-3 col-xl-3">
        <label className="form-label">Start Date:</label>
        <input
          type="date"
          className="form-control"
          value={startDate as string}
          onChange={($event) => setStartDate($event.target.value)}
        />
      </div>
      <div className="form-group col-xs-3 col-sm-3 col-lg-3 col-md-3 col-xl-3">
        <label className="form-label">End Date:</label>
        <input
          type="date"
          className="form-control"
          value={endDate as string}
          onChange={($event) => setEndDate($event.target.value)}
        />
      </div>
      <div className="form-group col-xs-3 col-sm-3 col-lg-3 col-md-3 col-xl-3">
        <label className="form-label">All Branches:</label>
        <select className="form-select" value={branchId} onChange={($event) => setBranchId($event.target.value)}>
          <option value="">Select Branch</option>
          {props.branchDetails.map((_stat) => (
            <option value={_stat._id} key={_stat._id}>
              {_stat.name}
            </option>
          ))}
        </select>
      </div>
      <div className="col-xs-7 col-sm-7 col-lg-7 col-md-7 col-xl-7 mt-5 d-flex justify-content-center">
        <MemoizedMyComponent labels={labels} columnData={columnData} />
      </div>
    </div>
  );
};

const mapStateToProps = (state: IRootState) => ({
  orderAnalysis: state.root.orderAnalysis,
  branchDetails: state.root.branchDetails,
  userDetails: state.root.userDetails,
});

const mapDispatchToProps = { setOrderAnalysis };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(OrderAnalysis);
