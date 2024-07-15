import { debounce } from "#utils/debounceLodash";

export const isObjectType = (val) => {
  return typeof val === "object" && !Array.isArray(val) && val !== null;
};

export const formDebounce = debounce(
  (action: () => void) => {
    action();
  },
  500,
  { leading: true, trailing: false },
);

export const isFilledDependencies = (deps: Array<string | number | undefined>): boolean => {
  let filled = true;

  deps.forEach((item) => {
    if (!item) {
      filled = false;
    }
  });

  return filled;
};

export const getBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });
};

export const UPLOAD_FILE_TYPES = {
  DOC: "DOC",
  PIC: "PIC",
  AUDIO: "AUDIO"
};

const isPic = (file: any) : boolean => {
  return file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/png";
};

const isAudio = (file: any) : boolean => {
  console.log("file type", file.type);

  return file.type === "audio/mpeg" || file.type === "audio/x-m4a";
};

export const isFileCorrespondType = (file: any, type: string) => {
  if (type === UPLOAD_FILE_TYPES.DOC) {
    return isPic(file) || file.type === "application/pdf";
  } else if (type === UPLOAD_FILE_TYPES.PIC) {
    return isPic(file);
  } else if (type === UPLOAD_FILE_TYPES.AUDIO) {
    return isAudio(file);
  }

  return true;
};

export const isFileCorrespondSize = (file: any, size = 0.5) => {
  return file.size / 1024 / 1024 <= size;
};

export const isJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const shuffledArray = (array) => {
  const newArr = [...array];
  return newArr.sort((a, b) => 0.5 - Math.random());
};

export const getBase64Photo = (file): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    // @ts-ignore
    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });
};