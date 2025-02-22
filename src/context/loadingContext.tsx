import { createContext, useContext, useReducer } from "react";

const state = {
  useAdmin: {
    getSubmitted: true,
    aproveCourse: true,
    rejectCourse: true,
    getIsAdmin: true,
  },
  useUserData: {
    getUserData: true,
    setSelectedDiscussion: true,
    userData: true,
  }
}

const defaultValue = {
  ...state,

  dispatch: (_action: { field: Path<typeof state>; payload: boolean }) => {},
};

const LoadingContext = createContext(defaultValue);

type Path<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}` | `${K}.${Path<T[K]>}`
          : `${K}`
        : never;
    }[keyof T]
  : never;

const appReducer = (
  state: typeof defaultValue,
  action: { field: Path<typeof state>; payload: boolean }
) => {
  const { field, payload } = action;
  const [useAdminField, useAdminSubField] = field.split(".");

  return {
    ...state,
    [useAdminField]: {
      ...(state as any)[useAdminField],

      [useAdminSubField]: payload,
    },
  };
};

export const LoadingContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(appReducer, defaultValue);
  return (
    <LoadingContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoadingContext = () => useContext(LoadingContext);
