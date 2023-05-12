import { createStore, Action } from 'redux';

// Action Types
const CHANGE_DEPARTMENT = 'CHANGE_DEPARTMENT';

// Action Creator
interface ChangeDepartmentAction extends Action<typeof CHANGE_DEPARTMENT> {
  payload: string;
}

export const setDepartment = (newDepartment: string): ChangeDepartmentAction => ({
  type: CHANGE_DEPARTMENT,
  payload: newDepartment,
});

// Reducer
interface DepartmentState {
  department: string;
}

const initialState: DepartmentState = {
  department: 'CS',
};

const departmentReducer = (state = initialState, action: ChangeDepartmentAction): DepartmentState => {
  switch (action.type) {
    case CHANGE_DEPARTMENT:
      return {
        ...state,
        department: action.payload,
      };
    default:
      return state;
  }
};

// Store
const departmentStore = createStore(departmentReducer);

export default departmentStore;
