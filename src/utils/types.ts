import type { ComponentType } from 'svelte';

export type InputValidationsType = {
  isValid?: boolean;
  errorMessage?: string;
};

export type loginCredentials = {
  email?: string;
  password?: string;
};

export type registerCredentials = {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
};

export interface IAuthStore {
  access_token?: string;
  refresh_token?: string;
}

export type UserType = {
  email?: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  id?: number;
  permission?: string;
  phone?: string;
  password1?: string;
  password2?: string;
  background_color?: string;
};

export type MemberType = {
  email?: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  background_color?: string;
  id?: number;
  permission?: string;
  phone?: string;
  created?: string;
  modified?: string;
  invited?: boolean;
  accepted?: boolean;
  last_project_working_on?: ProjectsType | null;
  last_tests_assigned?: TestRunChart | null;
  total_project_worked_on?: number;
  incomplete_test_runs_assigned_to_you?: TestRunChart[];
};

export type TokensType = {
  access_token: string;
  refresh_token: string;
};

export enum ToastEnum {
  primary = 'primary',
  secondary = 'secondary',
  success = 'success',
  danger = 'danger',
  warning = 'warning',
  info = 'info',
  light = 'light',
  dark = 'dark',
}

export enum DeleteType {
  project = 'Project',
  member = 'Member',
  testPlanSection = 'Test Plan Section',
  testPlan = 'Test Plan',
}

export enum MemberPermissions {
  full_access = 'full_access',
  admin_access = 'admin_access',
}

export type NotifacationType = {
  isOpen?: boolean;
  message?: string;
  className?: string;
  title?: string;
  timeOut?: number;
  requestType?: NotifacationTypeEnum;
};

export enum NotifacationTypeEnum {
  RequestDeleted = 204,
  RequestBadRequest = 400,
  RequestForbidden = 403,
  RequestNotFound = 404,
  RequestServerError = 500,
  RequestNetworkError = 503,
}

export type AlertType = {
  className?: string;
  title?: string;
  message?: string;
  isOpen?: boolean;
  close?: boolean;
  error?: object;
};

export type onSuccessResponseType<T> = {
  status: number;
  statusText: string;
  data: T;
  headers: object;
  request: object;
  message: string;
};
export type onResponseUser = onSuccessResponseType<UserType>;

export type onErrorResponseType = {
  response: {
    status: number;
    statusText: string;
    data?: {
      message?: string;
      detail?: string;
      error?: object;
      data?: object;
    };
  };
  message: string;
  name: string;
};

export type loginDataType = {
  refresh_token?: string;
  access_token?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  id?: number;
  data?: { access_token: string };
};

export type gitHubLogin = {
  client_id: string;
  client_secret: string;
  code: string;
};

export type ProjectActivity = {
  action: string;
  date: string;
};

export type ProjectTestCase = {
  created: string;
  modified: string;
  expected_result: string;
  description: string;
  id: number;
  last_saved: {
    full_name: string;
    id: number;
  };
  requirement: string;
  test_steps: string;
  test_suite: string;
  testcase_title: string;
  title: string;
};

export type ProjectTestSuite = {
  created: string;
  modified: string;
  failed: number;
  not_run: number;
  number_of_test_cases: number;
  passed: number;
  skipped: number;
  id: number;
  test_cases: ProjectTestCase[];
};

export type TestSuiteChart = {
  created: string;
  id: number;
  modified: string;
  number_of_test_cases: number;
  test_plan: number;
  title: string;
};

export type TestPlanSection = {
  title?: string;
  content?: string;
};

export type TestPlanChart = {
  created?: string;
  id?: number;
  title?: string;
  modified?: string;
  type?: string;
  temps?: Array<TestPlanSection>;
};

export type RequirementsDocChart = {
  title?: string;
  created?: string;
  id?: number;
  updated?: string;
  requirements?: Requirements[];
};

export type Requirements = {
  title?: string;
  description?: string;
  requirement_doc?: number;
  created?: string;
  id?: number;
  updated?: string;
  requirement_title?: string;
};

export type TestRunChart = {
  assigned_user: UserType;
  completed: string;
  created: string;
  modified: string;
  status: string;
  title: string;
  failed: number;
  id: number;
  not_run: number;
  passed: number;
  project_id: number;
  skipped: number;
  total_test_cases: number;
  test_suites: ProjectTestSuite[];
};

export type ProjectsType = {
  id?: number;
  title?: string;
  created?: string;
  short_description?: string;
  teams?: UserType[];
  activity?: ProjectActivity[];
  modified?: string;
  user?: string;
  github_repo?: boolean;
  repo_link?: string;
  total_suites?: TestSuiteChart[];
  test_plans?: TestPlanChart[];
  total_test_runs?: TestRunChart[];
  requirements_docs?: RequirementsDocChart[];
  people_with_the_most_incomplete_test_runs?: TestRunChart[];
  incomplete_test_runs_assigned_to_you?: TestRunChart;
};

export type TabType = {
  tabID: string;
  tabName: string;
  isActive: boolean;
  component: ComponentType;
};

export type UpdateFieldsModalobject = {
  fieldLabel: string;
  component: ComponentType;
  validation: CallableFunction;
  fieldValue: unknown;
  fieldName: string;
};
