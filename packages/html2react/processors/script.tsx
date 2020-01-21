import { Processor, Element } from "../types";
import Script from "@frontity/components/script";

const validMediaTypes = [
  "application/javascript",
  "text/javascript",
  "application/ecmascript"
];

const script: Processor = {
  test: node =>
    node.type === "element" &&
    node.component === "script" &&
    (!node.props.type || node.props.type in validMediaTypes),
  priority: 20,
  process: (node: Element) => {
    if (node.parent.component === "noscript") return node;

    if (node.props["data-src"]) {
      node.props.src = node.props["data-src"];
    }

    node.props.code = node.children.toString();

    node.component = Script;

    return node;
  }
};

export default script;
