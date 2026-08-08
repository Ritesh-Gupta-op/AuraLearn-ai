import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Assignment_Key {
  id: UUIDString;
  __typename?: 'Assignment_Key';
}

export interface Course_Key {
  id: UUIDString;
  __typename?: 'Course_Key';
}

export interface CreateAssignmentData {
  assignment_insert: Assignment_Key;
}

export interface CreateAssignmentVariables {
  courseId: UUIDString;
  title: string;
  dueDate: TimestampString;
}

export interface CreateCourseData {
  course_insert: Course_Key;
}

export interface CreateCourseVariables {
  title: string;
  description: string;
}

export interface CreateUserDataData {
  user_insert: User_Key;
}

export interface DeleteAssignmentData {
  assignment_delete?: Assignment_Key | null;
}

export interface DeleteAssignmentVariables {
  id: UUIDString;
}

export interface DeleteCourseData {
  course_delete?: Course_Key | null;
}

export interface DeleteCourseVariables {
  id: UUIDString;
}

export interface DeletePostData {
  discussionPost_delete?: DiscussionPost_Key | null;
}

export interface DeletePostVariables {
  id: UUIDString;
}

export interface DeleteSubmissionData {
  submission_delete?: Submission_Key | null;
}

export interface DeleteSubmissionVariables {
  id: UUIDString;
}

export interface DeleteUserData {
  user_delete?: User_Key | null;
}

export interface DiscussionPost_Key {
  id: UUIDString;
  __typename?: 'DiscussionPost_Key';
}

export interface DropCourseData {
  enrollment_delete?: Enrollment_Key | null;
}

export interface DropCourseVariables {
  id: UUIDString;
}

export interface EnrollData {
  enrollment_insert: Enrollment_Key;
}

export interface EnrollVariables {
  courseId: UUIDString;
}

export interface Enrollment_Key {
  id: UUIDString;
  __typename?: 'Enrollment_Key';
}

export interface GetAssignmentData {
  assignment?: {
    title: string;
    dueDate: TimestampString;
  };
}

export interface GetAssignmentVariables {
  id: UUIDString;
}

export interface GetCourseData {
  course?: {
    title: string;
    description: string;
  };
}

export interface GetCourseVariables {
  id: UUIDString;
}

export interface GetCurrentUserData {
  user?: {
    name: string;
    email: string;
    role: string;
  };
}

export interface GetEnrollmentData {
  enrollment?: {
    course: {
      title: string;
    };
    enrollmentDate: DateString;
  };
}

export interface GetEnrollmentVariables {
  id: UUIDString;
}

export interface GetPostData {
  discussionPost?: {
    content: string;
    user: {
      name: string;
    };
  };
}

export interface GetPostVariables {
  id: UUIDString;
}

export interface GetSubmissionData {
  submission?: {
    submissionUrl: string;
    grade?: number | null;
    instructorFeedback?: string | null;
  };
}

export interface GetSubmissionVariables {
  id: UUIDString;
}

export interface ListAllUsersData {
  users: ({
    name: string;
    role: string;
  })[];
}

export interface ListAssignmentsData {
  assignments: ({
    title: string;
  })[];
}

export interface ListAssignmentsVariables {
  courseId: UUIDString;
}

export interface ListCoursePostsData {
  discussionPosts: ({
    content: string;
    timestamp?: TimestampString | null;
  })[];
}

export interface ListCoursePostsVariables {
  courseId: UUIDString;
}

export interface ListCoursesData {
  courses: ({
    title: string;
  })[];
}

export interface ListMyEnrollmentsData {
  enrollments: ({
    course: {
      title: string;
    };
  })[];
}

export interface ListMySubmissionsData {
  submissions: ({
    assignment: {
      title: string;
    };
    grade?: number | null;
  })[];
}

export interface PostDiscussionData {
  discussionPost_insert: DiscussionPost_Key;
}

export interface PostDiscussionVariables {
  courseId: UUIDString;
  content: string;
}

export interface Submission_Key {
  id: UUIDString;
  __typename?: 'Submission_Key';
}

export interface SubmitAssignmentData {
  submission_insert: Submission_Key;
}

export interface SubmitAssignmentVariables {
  assignmentId: UUIDString;
  url: string;
}

export interface UpdateAssignmentData {
  assignment_update?: Assignment_Key | null;
}

export interface UpdateAssignmentVariables {
  id: UUIDString;
  maxPoints?: number | null;
}

export interface UpdateCourseData {
  course_update?: Course_Key | null;
}

export interface UpdateCourseVariables {
  id: UUIDString;
  title?: string | null;
}

export interface UpdateEnrollmentData {
  enrollment_update?: Enrollment_Key | null;
}

export interface UpdateEnrollmentVariables {
  id: UUIDString;
  date: DateString;
}

export interface UpdateGradeData {
  submission_update?: Submission_Key | null;
}

export interface UpdateGradeVariables {
  id: UUIDString;
  grade?: number | null;
}

export interface UpdatePostData {
  discussionPost_update?: DiscussionPost_Key | null;
}

export interface UpdatePostVariables {
  id: UUIDString;
  content: string;
}

export interface UpdateUserData {
  user_update?: User_Key | null;
}

export interface UpdateUserVariables {
  name: string;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserDataRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateUserDataData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateUserDataData, undefined>;
  operationName: string;
}
export const createUserDataRef: CreateUserDataRef;

export function createUserData(): MutationPromise<CreateUserDataData, undefined>;
export function createUserData(dc: DataConnect): MutationPromise<CreateUserDataData, undefined>;

interface DeleteUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteUserData, undefined>;
  operationName: string;
}
export const deleteUserRef: DeleteUserRef;

export function deleteUser(): MutationPromise<DeleteUserData, undefined>;
export function deleteUser(dc: DataConnect): MutationPromise<DeleteUserData, undefined>;

interface UpdateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
  operationName: string;
}
export const updateUserRef: UpdateUserRef;

export function updateUser(vars: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;
export function updateUser(dc: DataConnect, vars: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface GetCurrentUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetCurrentUserData, undefined>;
  operationName: string;
}
export const getCurrentUserRef: GetCurrentUserRef;

export function getCurrentUser(options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;
export function getCurrentUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;

interface ListAllUsersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllUsersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAllUsersData, undefined>;
  operationName: string;
}
export const listAllUsersRef: ListAllUsersRef;

export function listAllUsers(options?: ExecuteQueryOptions): QueryPromise<ListAllUsersData, undefined>;
export function listAllUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAllUsersData, undefined>;

interface CreateCourseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateCourseVariables): MutationRef<CreateCourseData, CreateCourseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateCourseVariables): MutationRef<CreateCourseData, CreateCourseVariables>;
  operationName: string;
}
export const createCourseRef: CreateCourseRef;

export function createCourse(vars: CreateCourseVariables): MutationPromise<CreateCourseData, CreateCourseVariables>;
export function createCourse(dc: DataConnect, vars: CreateCourseVariables): MutationPromise<CreateCourseData, CreateCourseVariables>;

interface DeleteCourseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteCourseVariables): MutationRef<DeleteCourseData, DeleteCourseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteCourseVariables): MutationRef<DeleteCourseData, DeleteCourseVariables>;
  operationName: string;
}
export const deleteCourseRef: DeleteCourseRef;

export function deleteCourse(vars: DeleteCourseVariables): MutationPromise<DeleteCourseData, DeleteCourseVariables>;
export function deleteCourse(dc: DataConnect, vars: DeleteCourseVariables): MutationPromise<DeleteCourseData, DeleteCourseVariables>;

interface UpdateCourseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateCourseVariables): MutationRef<UpdateCourseData, UpdateCourseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateCourseVariables): MutationRef<UpdateCourseData, UpdateCourseVariables>;
  operationName: string;
}
export const updateCourseRef: UpdateCourseRef;

export function updateCourse(vars: UpdateCourseVariables): MutationPromise<UpdateCourseData, UpdateCourseVariables>;
export function updateCourse(dc: DataConnect, vars: UpdateCourseVariables): MutationPromise<UpdateCourseData, UpdateCourseVariables>;

interface GetCourseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCourseVariables): QueryRef<GetCourseData, GetCourseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetCourseVariables): QueryRef<GetCourseData, GetCourseVariables>;
  operationName: string;
}
export const getCourseRef: GetCourseRef;

export function getCourse(vars: GetCourseVariables, options?: ExecuteQueryOptions): QueryPromise<GetCourseData, GetCourseVariables>;
export function getCourse(dc: DataConnect, vars: GetCourseVariables, options?: ExecuteQueryOptions): QueryPromise<GetCourseData, GetCourseVariables>;

interface ListCoursesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListCoursesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListCoursesData, undefined>;
  operationName: string;
}
export const listCoursesRef: ListCoursesRef;

export function listCourses(options?: ExecuteQueryOptions): QueryPromise<ListCoursesData, undefined>;
export function listCourses(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListCoursesData, undefined>;

interface EnrollRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: EnrollVariables): MutationRef<EnrollData, EnrollVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: EnrollVariables): MutationRef<EnrollData, EnrollVariables>;
  operationName: string;
}
export const enrollRef: EnrollRef;

export function enroll(vars: EnrollVariables): MutationPromise<EnrollData, EnrollVariables>;
export function enroll(dc: DataConnect, vars: EnrollVariables): MutationPromise<EnrollData, EnrollVariables>;

interface DropCourseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DropCourseVariables): MutationRef<DropCourseData, DropCourseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DropCourseVariables): MutationRef<DropCourseData, DropCourseVariables>;
  operationName: string;
}
export const dropCourseRef: DropCourseRef;

export function dropCourse(vars: DropCourseVariables): MutationPromise<DropCourseData, DropCourseVariables>;
export function dropCourse(dc: DataConnect, vars: DropCourseVariables): MutationPromise<DropCourseData, DropCourseVariables>;

interface UpdateEnrollmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateEnrollmentVariables): MutationRef<UpdateEnrollmentData, UpdateEnrollmentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateEnrollmentVariables): MutationRef<UpdateEnrollmentData, UpdateEnrollmentVariables>;
  operationName: string;
}
export const updateEnrollmentRef: UpdateEnrollmentRef;

export function updateEnrollment(vars: UpdateEnrollmentVariables): MutationPromise<UpdateEnrollmentData, UpdateEnrollmentVariables>;
export function updateEnrollment(dc: DataConnect, vars: UpdateEnrollmentVariables): MutationPromise<UpdateEnrollmentData, UpdateEnrollmentVariables>;

interface GetEnrollmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetEnrollmentVariables): QueryRef<GetEnrollmentData, GetEnrollmentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetEnrollmentVariables): QueryRef<GetEnrollmentData, GetEnrollmentVariables>;
  operationName: string;
}
export const getEnrollmentRef: GetEnrollmentRef;

export function getEnrollment(vars: GetEnrollmentVariables, options?: ExecuteQueryOptions): QueryPromise<GetEnrollmentData, GetEnrollmentVariables>;
export function getEnrollment(dc: DataConnect, vars: GetEnrollmentVariables, options?: ExecuteQueryOptions): QueryPromise<GetEnrollmentData, GetEnrollmentVariables>;

interface ListMyEnrollmentsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyEnrollmentsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListMyEnrollmentsData, undefined>;
  operationName: string;
}
export const listMyEnrollmentsRef: ListMyEnrollmentsRef;

export function listMyEnrollments(options?: ExecuteQueryOptions): QueryPromise<ListMyEnrollmentsData, undefined>;
export function listMyEnrollments(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyEnrollmentsData, undefined>;

interface CreateAssignmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAssignmentVariables): MutationRef<CreateAssignmentData, CreateAssignmentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateAssignmentVariables): MutationRef<CreateAssignmentData, CreateAssignmentVariables>;
  operationName: string;
}
export const createAssignmentRef: CreateAssignmentRef;

export function createAssignment(vars: CreateAssignmentVariables): MutationPromise<CreateAssignmentData, CreateAssignmentVariables>;
export function createAssignment(dc: DataConnect, vars: CreateAssignmentVariables): MutationPromise<CreateAssignmentData, CreateAssignmentVariables>;

interface DeleteAssignmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteAssignmentVariables): MutationRef<DeleteAssignmentData, DeleteAssignmentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteAssignmentVariables): MutationRef<DeleteAssignmentData, DeleteAssignmentVariables>;
  operationName: string;
}
export const deleteAssignmentRef: DeleteAssignmentRef;

export function deleteAssignment(vars: DeleteAssignmentVariables): MutationPromise<DeleteAssignmentData, DeleteAssignmentVariables>;
export function deleteAssignment(dc: DataConnect, vars: DeleteAssignmentVariables): MutationPromise<DeleteAssignmentData, DeleteAssignmentVariables>;

interface UpdateAssignmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateAssignmentVariables): MutationRef<UpdateAssignmentData, UpdateAssignmentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateAssignmentVariables): MutationRef<UpdateAssignmentData, UpdateAssignmentVariables>;
  operationName: string;
}
export const updateAssignmentRef: UpdateAssignmentRef;

export function updateAssignment(vars: UpdateAssignmentVariables): MutationPromise<UpdateAssignmentData, UpdateAssignmentVariables>;
export function updateAssignment(dc: DataConnect, vars: UpdateAssignmentVariables): MutationPromise<UpdateAssignmentData, UpdateAssignmentVariables>;

interface GetAssignmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAssignmentVariables): QueryRef<GetAssignmentData, GetAssignmentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetAssignmentVariables): QueryRef<GetAssignmentData, GetAssignmentVariables>;
  operationName: string;
}
export const getAssignmentRef: GetAssignmentRef;

export function getAssignment(vars: GetAssignmentVariables, options?: ExecuteQueryOptions): QueryPromise<GetAssignmentData, GetAssignmentVariables>;
export function getAssignment(dc: DataConnect, vars: GetAssignmentVariables, options?: ExecuteQueryOptions): QueryPromise<GetAssignmentData, GetAssignmentVariables>;

interface ListAssignmentsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListAssignmentsVariables): QueryRef<ListAssignmentsData, ListAssignmentsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListAssignmentsVariables): QueryRef<ListAssignmentsData, ListAssignmentsVariables>;
  operationName: string;
}
export const listAssignmentsRef: ListAssignmentsRef;

export function listAssignments(vars: ListAssignmentsVariables, options?: ExecuteQueryOptions): QueryPromise<ListAssignmentsData, ListAssignmentsVariables>;
export function listAssignments(dc: DataConnect, vars: ListAssignmentsVariables, options?: ExecuteQueryOptions): QueryPromise<ListAssignmentsData, ListAssignmentsVariables>;

interface SubmitAssignmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SubmitAssignmentVariables): MutationRef<SubmitAssignmentData, SubmitAssignmentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SubmitAssignmentVariables): MutationRef<SubmitAssignmentData, SubmitAssignmentVariables>;
  operationName: string;
}
export const submitAssignmentRef: SubmitAssignmentRef;

export function submitAssignment(vars: SubmitAssignmentVariables): MutationPromise<SubmitAssignmentData, SubmitAssignmentVariables>;
export function submitAssignment(dc: DataConnect, vars: SubmitAssignmentVariables): MutationPromise<SubmitAssignmentData, SubmitAssignmentVariables>;

interface DeleteSubmissionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteSubmissionVariables): MutationRef<DeleteSubmissionData, DeleteSubmissionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteSubmissionVariables): MutationRef<DeleteSubmissionData, DeleteSubmissionVariables>;
  operationName: string;
}
export const deleteSubmissionRef: DeleteSubmissionRef;

export function deleteSubmission(vars: DeleteSubmissionVariables): MutationPromise<DeleteSubmissionData, DeleteSubmissionVariables>;
export function deleteSubmission(dc: DataConnect, vars: DeleteSubmissionVariables): MutationPromise<DeleteSubmissionData, DeleteSubmissionVariables>;

interface UpdateGradeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateGradeVariables): MutationRef<UpdateGradeData, UpdateGradeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateGradeVariables): MutationRef<UpdateGradeData, UpdateGradeVariables>;
  operationName: string;
}
export const updateGradeRef: UpdateGradeRef;

export function updateGrade(vars: UpdateGradeVariables): MutationPromise<UpdateGradeData, UpdateGradeVariables>;
export function updateGrade(dc: DataConnect, vars: UpdateGradeVariables): MutationPromise<UpdateGradeData, UpdateGradeVariables>;

interface GetSubmissionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetSubmissionVariables): QueryRef<GetSubmissionData, GetSubmissionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetSubmissionVariables): QueryRef<GetSubmissionData, GetSubmissionVariables>;
  operationName: string;
}
export const getSubmissionRef: GetSubmissionRef;

export function getSubmission(vars: GetSubmissionVariables, options?: ExecuteQueryOptions): QueryPromise<GetSubmissionData, GetSubmissionVariables>;
export function getSubmission(dc: DataConnect, vars: GetSubmissionVariables, options?: ExecuteQueryOptions): QueryPromise<GetSubmissionData, GetSubmissionVariables>;

interface ListMySubmissionsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMySubmissionsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListMySubmissionsData, undefined>;
  operationName: string;
}
export const listMySubmissionsRef: ListMySubmissionsRef;

export function listMySubmissions(options?: ExecuteQueryOptions): QueryPromise<ListMySubmissionsData, undefined>;
export function listMySubmissions(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMySubmissionsData, undefined>;

interface PostDiscussionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: PostDiscussionVariables): MutationRef<PostDiscussionData, PostDiscussionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: PostDiscussionVariables): MutationRef<PostDiscussionData, PostDiscussionVariables>;
  operationName: string;
}
export const postDiscussionRef: PostDiscussionRef;

export function postDiscussion(vars: PostDiscussionVariables): MutationPromise<PostDiscussionData, PostDiscussionVariables>;
export function postDiscussion(dc: DataConnect, vars: PostDiscussionVariables): MutationPromise<PostDiscussionData, PostDiscussionVariables>;

interface DeletePostRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeletePostVariables): MutationRef<DeletePostData, DeletePostVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeletePostVariables): MutationRef<DeletePostData, DeletePostVariables>;
  operationName: string;
}
export const deletePostRef: DeletePostRef;

export function deletePost(vars: DeletePostVariables): MutationPromise<DeletePostData, DeletePostVariables>;
export function deletePost(dc: DataConnect, vars: DeletePostVariables): MutationPromise<DeletePostData, DeletePostVariables>;

interface UpdatePostRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdatePostVariables): MutationRef<UpdatePostData, UpdatePostVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdatePostVariables): MutationRef<UpdatePostData, UpdatePostVariables>;
  operationName: string;
}
export const updatePostRef: UpdatePostRef;

export function updatePost(vars: UpdatePostVariables): MutationPromise<UpdatePostData, UpdatePostVariables>;
export function updatePost(dc: DataConnect, vars: UpdatePostVariables): MutationPromise<UpdatePostData, UpdatePostVariables>;

interface GetPostRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPostVariables): QueryRef<GetPostData, GetPostVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetPostVariables): QueryRef<GetPostData, GetPostVariables>;
  operationName: string;
}
export const getPostRef: GetPostRef;

export function getPost(vars: GetPostVariables, options?: ExecuteQueryOptions): QueryPromise<GetPostData, GetPostVariables>;
export function getPost(dc: DataConnect, vars: GetPostVariables, options?: ExecuteQueryOptions): QueryPromise<GetPostData, GetPostVariables>;

interface ListCoursePostsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListCoursePostsVariables): QueryRef<ListCoursePostsData, ListCoursePostsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListCoursePostsVariables): QueryRef<ListCoursePostsData, ListCoursePostsVariables>;
  operationName: string;
}
export const listCoursePostsRef: ListCoursePostsRef;

export function listCoursePosts(vars: ListCoursePostsVariables, options?: ExecuteQueryOptions): QueryPromise<ListCoursePostsData, ListCoursePostsVariables>;
export function listCoursePosts(dc: DataConnect, vars: ListCoursePostsVariables, options?: ExecuteQueryOptions): QueryPromise<ListCoursePostsData, ListCoursePostsVariables>;

