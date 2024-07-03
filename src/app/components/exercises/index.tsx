import React, { FC, useEffect, useMemo, useState } from "react";
import { ContextPopover } from "#ui/contextPopover";
import { ButtonUI } from "#ui/button";
import { DeleteIcon, EditSvgIcon } from "#src/assets/svg";
import { Popconfirm } from "antd";
import { $deleteExercise } from "#stores/exercise";
import { templateTypes } from "#constants/index";
import { TemplateTest } from "#components/templates/test";
import { TemplateTextBlock } from "#components/templates/textBlock";
import { TemplateBlank } from "#components/templates/blank";
import { TemplateFillText } from "#components/templates/fillText";
import { TemplateVideo } from "#components/templates/video";
import { TemplateImages } from "#components/templates/images";
import { TemplateFillImages } from "#components/templates/fillImages";
import { useStore } from "effector-react";
import { notificationSuccess } from "#ui/notifications";
import { $exerciseAnswers, $homeWorkExerciseAnswers } from "#src/app/sections/lessons/details/effector";
import { useRole } from "#hooks/useRole";

type PropsType = {
  exercises: Array<any>;
  onExerciseEdit: (item: any) => void;
  isMine: boolean;
  showHints: boolean;
  entityId: number;
  onCreateExerciseAnswerMain: (id: any, res: any, prevState: any) => void;
  isHomework: boolean;
}

// todo move it to app component

export const Exercises: FC<PropsType> = (props) => {
  const {
    exercises,
    onExerciseEdit,
    isMine,
    showHints,
    entityId,
    onCreateExerciseAnswerMain,
    isHomework
  } = props;

  const { isTeacher } = useRole();

  const deleteExerciseState = useStore($deleteExercise.store);
  const exerciseAnswersState = useStore($exerciseAnswers.store);
  const homeWorkExerciseAnswersState = useStore($homeWorkExerciseAnswers.store);

  const [deletedExerciseIds, setDeletedExerciseIds] = useState<{ [key: string]: boolean }>({});

  const commonExerciseItemProps = useMemo(() => {
    return {
      showHints,
      answersState: isHomework ? homeWorkExerciseAnswersState[entityId] : exerciseAnswersState[entityId],
      onCreateExerciseAnswer: onCreateExerciseAnswerMain,
    };
  }, [homeWorkExerciseAnswersState, exerciseAnswersState, showHints]);

  console.log("deleteExerciseState", deleteExerciseState);

  // todo deleteCommon
  useEffect(() => {

    if (deleteExerciseState.data) {
      notificationSuccess("", "Упражнение удалено");

      setDeletedExerciseIds((prevState) => ({
        ...prevState,
        [deleteExerciseState.data.id]: true
      }));
    }
  }, [deleteExerciseState.data]);

  return (
    <>
      {exercises.map((item, index) => (
        <React.Fragment key={item.id}>
          {/* after delete you need to remove from exercises array */}
          {!deletedExerciseIds[item.id] && (
            <div className="exercise-item" key={item.id}>
              <div className="exercise-item__title">
                <div className="exercise-item__title__in">
                  <div className="exercise-item__title__in__number">{index + 1}</div>
                  <div>{item.title}</div>
                </div>
                {isMine && (
                  <div className="exercise-item__title__actions">
                    <ContextPopover
                      content={(
                        <>
                          <div className="custom__popover__item">
                            <ButtonUI
                              withIcon
                              onClick={() => {
                                onExerciseEdit(item);
                              }}
                            >
                              <EditSvgIcon /> Редактировать
                            </ButtonUI>
                          </div>
                          <div className="custom__popover__item">
                            <Popconfirm
                              title="Вы уверены, что хотите удалить упражнение ?"
                              onConfirm={() => {
                                $deleteExercise.effect(item.id)
                              }}
                              okText="Да"
                              cancelText="Нет"
                            >
                              <ButtonUI
                                danger
                                withIcon
                                loading={deleteExerciseState.loading}
                              >
                                <DeleteIcon /> Удалить
                              </ButtonUI>
                            </Popconfirm>
                          </div>
                        </>
                      )}
                    />
                  </div>
                )}
              </div>
              <div className="exercise-item__body">
                {item.template === templateTypes.TEST && (
                  <TemplateTest data={item} {...commonExerciseItemProps} />
                )}
                {item.template === templateTypes.TEXT_BLOCK && (
                  <TemplateTextBlock data={item} {...commonExerciseItemProps} />
                )}
                {item.template === templateTypes.BLANK && (
                  <TemplateBlank data={item} {...commonExerciseItemProps} />
                )}
                {item.template === templateTypes.FILL_TEXT && (
                  <TemplateFillText data={item} {...commonExerciseItemProps} />
                )}
                {item.template === templateTypes.VIDEO && (
                  <TemplateVideo data={item} {...commonExerciseItemProps} />
                )}
                {item.template === templateTypes.IMAGES && (
                  <TemplateImages data={item} {...commonExerciseItemProps} />
                )}
                {item.template === templateTypes.FILL_IMAGES && (
                  <TemplateFillImages data={item} {...commonExerciseItemProps} />
                )}

                {item.metaData.notes && (item.metaData.notes.showNotes || isTeacher) && (
                  <div className="exercise-item__notes">
                    {item.metaData.notes.value}
                  </div>
                )}
              </div>
            </div>
          )}
        </React.Fragment>
      ))}
    </>
  )
}