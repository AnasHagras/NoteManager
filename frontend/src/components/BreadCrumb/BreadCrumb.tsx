import React from "react";
import { useTreeStore } from "../../store";
import { getPathToNode } from "../../utils/helper";
import * as S from "./BreadCrumb.styles";

interface BreadCrumbProps {
  nodeId: string;
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({ nodeId }) => {
  const { tree, setLastOpenedNote } = useTreeStore();

  const path = getPathToNode(tree, nodeId);

  return (
    <>
      <S.BreadCrumbContainer>
        {path.map((node, index) => (
          <React.Fragment key={node.id}>
            <S.BreadCrumbItem
              onClick={() => {
                setLastOpenedNote(node.id);
              }}
            >
              {node.title}
            </S.BreadCrumbItem>
            {index < path.length - 1 && (
              <S.BreadCrumbSeparator>→</S.BreadCrumbSeparator>
            )}
          </React.Fragment>
        ))}
      </S.BreadCrumbContainer>
    </>
  );
};

export default BreadCrumb;
