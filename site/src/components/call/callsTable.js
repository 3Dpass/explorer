import { callsHead } from "../../utils/constants";
import ExtrinsicParametersDisplay from "../extrinsicParametersDisplay";
import { ColoredLink } from "../styled/link";
import Table from "../table";
import { Tag } from "../tag";

/**
 * @description page call table
 * @property data
 */
export default function CallsTable(props) {
  const { data = [], loading } = props ?? {};

  const tableData = data?.map((item) => {
    return [
      <ColoredLink
        to={`/call/${item?.indexer?.blockHeight}-${item?.indexer?.extrinsicIndex}-${item?.indexer?.callIndex}`}
      >
        {item?.indexer?.blockHeight.toLocaleString()}-{item?.indexer?.callIndex}
      </ColoredLink>,
      <ColoredLink
        to={`/extrinsic/${item?.indexer?.blockHeight}-${item?.indexer?.extrinsicIndex}`}
      >
        {item?.indexer?.blockHeight.toLocaleString()}-
        {item?.indexer?.extrinsicIndex}
      </ColoredLink>,
      <ColoredLink to={`/block/${item?.indexer?.blockHeight}`}>
        {item?.indexer?.blockHeight.toLocaleString()}
      </ColoredLink>,
      item?.indexer?.blockTime,
      <Tag>{item?.method}</Tag>,
      `${item?.section}(${item?.method})`,
      <ExtrinsicParametersDisplay extrinsic={{ call: item }} />,
    ];
  });

  return <Table heads={callsHead} data={tableData} loading={loading} />;
}
