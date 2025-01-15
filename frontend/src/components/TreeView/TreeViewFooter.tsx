import {
  TreeViewFooterButton,
  TreeViewFooterContainer,
} from "./TreeViewFooter.style";

type TreeViewFooterProps = {
  onClick: () => void;
};

const TreeViewFooter = ({ onClick }: TreeViewFooterProps) => {
  return (
    <TreeViewFooterContainer>
      <TreeViewFooterButton onClick={onClick}>Logout</TreeViewFooterButton>
    </TreeViewFooterContainer>
  );
};

export default TreeViewFooter;
