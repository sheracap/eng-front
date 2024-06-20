import React, { FC, ReactNode, useEffect, useRef } from "react";

type PropsTypes = {
  children: ReactNode;
}

export const LessonDetailsLeftColumnScroll: FC<PropsTypes> = (props) => {
  const { children } = props;

  const columnRef = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    console.log("scroll");
    const column = columnRef.current;

    if (column) {
      const scrollTop = window.pageYOffset;
      // @ts-ignore
      const columnOffset = column.defaultFilterOffset;
      const headerHeight = 72;
      const columnPadding = 0;
      const columnHeight = window.innerHeight - headerHeight - columnPadding - columnPadding;

      if (scrollTop >= columnOffset - headerHeight) {
        if (!column.style.height || column.style.height === "auto") {
          column.style.height = `${columnHeight}px`;
          column.style.paddingRight = "10px";
        }
      } else {
        if (column.style.height && column.style.height !== "auto") {
          column.style.height = "auto";
        }
      }
    }
  };

  useEffect(() => {

    if (columnRef.current && window.innerWidth > 991) {
      console.log("window.innerHeight", window.innerHeight);

      const headerHeight = 78;
      const columnPadding = 20;
      const bodyPadding = 20;
      const columnHeight = window.innerHeight - headerHeight - columnPadding - bodyPadding;


      columnRef.current.style.height = `${columnHeight}px`;
    }

  }, []);

  return (
    <div ref={columnRef} className="lesson-details__left__in__cont u-fancy-scrollbar">
      {children}
    </div>
  );
}