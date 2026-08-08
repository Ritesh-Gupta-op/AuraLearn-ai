import { CreateUserDataData, DeleteUserData, UpdateUserData, UpdateUserVariables, GetCurrentUserData, ListAllUsersData, CreateCourseData, CreateCourseVariables, DeleteCourseData, DeleteCourseVariables, UpdateCourseData, UpdateCourseVariables, GetCourseData, GetCourseVariables, ListCoursesData, EnrollData, EnrollVariables, DropCourseData, DropCourseVariables, UpdateEnrollmentData, UpdateEnrollmentVariables, GetEnrollmentData, GetEnrollmentVariables, ListMyEnrollmentsData, CreateAssignmentData, CreateAssignmentVariables, DeleteAssignmentData, DeleteAssignmentVariables, UpdateAssignmentData, UpdateAssignmentVariables, GetAssignmentData, GetAssignmentVariables, ListAssignmentsData, ListAssignmentsVariables, SubmitAssignmentData, SubmitAssignmentVariables, DeleteSubmissionData, DeleteSubmissionVariables, UpdateGradeData, UpdateGradeVariables, GetSubmissionData, GetSubmissionVariables, ListMySubmissionsData, PostDiscussionData, PostDiscussionVariables, DeletePostData, DeletePostVariables, UpdatePostData, UpdatePostVariables, GetPostData, GetPostVariables, ListCoursePostsData, ListCoursePostsVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateUserData(options?: useDataConnectMutationOptions<CreateUserDataData, FirebaseError, void>): UseDataConnectMutationResult<CreateUserDataData, undefined>;
export function useCreateUserData(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserDataData, FirebaseError, void>): UseDataConnectMutationResult<CreateUserDataData, undefined>;

export function useDeleteUser(options?: useDataConnectMutationOptions<DeleteUserData, FirebaseError, void>): UseDataConnectMutationResult<DeleteUserData, undefined>;
export function useDeleteUser(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteUserData, FirebaseError, void>): UseDataConnectMutationResult<DeleteUserData, undefined>;

export function useUpdateUser(options?: useDataConnectMutationOptions<UpdateUserData, FirebaseError, UpdateUserVariables>): UseDataConnectMutationResult<UpdateUserData, UpdateUserVariables>;
export function useUpdateUser(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateUserData, FirebaseError, UpdateUserVariables>): UseDataConnectMutationResult<UpdateUserData, UpdateUserVariables>;

export function useGetCurrentUser(options?: useDataConnectQueryOptions<GetCurrentUserData>): UseDataConnectQueryResult<GetCurrentUserData, undefined>;
export function useGetCurrentUser(dc: DataConnect, options?: useDataConnectQueryOptions<GetCurrentUserData>): UseDataConnectQueryResult<GetCurrentUserData, undefined>;

export function useListAllUsers(options?: useDataConnectQueryOptions<ListAllUsersData>): UseDataConnectQueryResult<ListAllUsersData, undefined>;
export function useListAllUsers(dc: DataConnect, options?: useDataConnectQueryOptions<ListAllUsersData>): UseDataConnectQueryResult<ListAllUsersData, undefined>;

export function useCreateCourse(options?: useDataConnectMutationOptions<CreateCourseData, FirebaseError, CreateCourseVariables>): UseDataConnectMutationResult<CreateCourseData, CreateCourseVariables>;
export function useCreateCourse(dc: DataConnect, options?: useDataConnectMutationOptions<CreateCourseData, FirebaseError, CreateCourseVariables>): UseDataConnectMutationResult<CreateCourseData, CreateCourseVariables>;

export function useDeleteCourse(options?: useDataConnectMutationOptions<DeleteCourseData, FirebaseError, DeleteCourseVariables>): UseDataConnectMutationResult<DeleteCourseData, DeleteCourseVariables>;
export function useDeleteCourse(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteCourseData, FirebaseError, DeleteCourseVariables>): UseDataConnectMutationResult<DeleteCourseData, DeleteCourseVariables>;

export function useUpdateCourse(options?: useDataConnectMutationOptions<UpdateCourseData, FirebaseError, UpdateCourseVariables>): UseDataConnectMutationResult<UpdateCourseData, UpdateCourseVariables>;
export function useUpdateCourse(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateCourseData, FirebaseError, UpdateCourseVariables>): UseDataConnectMutationResult<UpdateCourseData, UpdateCourseVariables>;

export function useGetCourse(vars: GetCourseVariables, options?: useDataConnectQueryOptions<GetCourseData>): UseDataConnectQueryResult<GetCourseData, GetCourseVariables>;
export function useGetCourse(dc: DataConnect, vars: GetCourseVariables, options?: useDataConnectQueryOptions<GetCourseData>): UseDataConnectQueryResult<GetCourseData, GetCourseVariables>;

export function useListCourses(options?: useDataConnectQueryOptions<ListCoursesData>): UseDataConnectQueryResult<ListCoursesData, undefined>;
export function useListCourses(dc: DataConnect, options?: useDataConnectQueryOptions<ListCoursesData>): UseDataConnectQueryResult<ListCoursesData, undefined>;

export function useEnroll(options?: useDataConnectMutationOptions<EnrollData, FirebaseError, EnrollVariables>): UseDataConnectMutationResult<EnrollData, EnrollVariables>;
export function useEnroll(dc: DataConnect, options?: useDataConnectMutationOptions<EnrollData, FirebaseError, EnrollVariables>): UseDataConnectMutationResult<EnrollData, EnrollVariables>;

export function useDropCourse(options?: useDataConnectMutationOptions<DropCourseData, FirebaseError, DropCourseVariables>): UseDataConnectMutationResult<DropCourseData, DropCourseVariables>;
export function useDropCourse(dc: DataConnect, options?: useDataConnectMutationOptions<DropCourseData, FirebaseError, DropCourseVariables>): UseDataConnectMutationResult<DropCourseData, DropCourseVariables>;

export function useUpdateEnrollment(options?: useDataConnectMutationOptions<UpdateEnrollmentData, FirebaseError, UpdateEnrollmentVariables>): UseDataConnectMutationResult<UpdateEnrollmentData, UpdateEnrollmentVariables>;
export function useUpdateEnrollment(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateEnrollmentData, FirebaseError, UpdateEnrollmentVariables>): UseDataConnectMutationResult<UpdateEnrollmentData, UpdateEnrollmentVariables>;

export function useGetEnrollment(vars: GetEnrollmentVariables, options?: useDataConnectQueryOptions<GetEnrollmentData>): UseDataConnectQueryResult<GetEnrollmentData, GetEnrollmentVariables>;
export function useGetEnrollment(dc: DataConnect, vars: GetEnrollmentVariables, options?: useDataConnectQueryOptions<GetEnrollmentData>): UseDataConnectQueryResult<GetEnrollmentData, GetEnrollmentVariables>;

export function useListMyEnrollments(options?: useDataConnectQueryOptions<ListMyEnrollmentsData>): UseDataConnectQueryResult<ListMyEnrollmentsData, undefined>;
export function useListMyEnrollments(dc: DataConnect, options?: useDataConnectQueryOptions<ListMyEnrollmentsData>): UseDataConnectQueryResult<ListMyEnrollmentsData, undefined>;

export function useCreateAssignment(options?: useDataConnectMutationOptions<CreateAssignmentData, FirebaseError, CreateAssignmentVariables>): UseDataConnectMutationResult<CreateAssignmentData, CreateAssignmentVariables>;
export function useCreateAssignment(dc: DataConnect, options?: useDataConnectMutationOptions<CreateAssignmentData, FirebaseError, CreateAssignmentVariables>): UseDataConnectMutationResult<CreateAssignmentData, CreateAssignmentVariables>;

export function useDeleteAssignment(options?: useDataConnectMutationOptions<DeleteAssignmentData, FirebaseError, DeleteAssignmentVariables>): UseDataConnectMutationResult<DeleteAssignmentData, DeleteAssignmentVariables>;
export function useDeleteAssignment(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteAssignmentData, FirebaseError, DeleteAssignmentVariables>): UseDataConnectMutationResult<DeleteAssignmentData, DeleteAssignmentVariables>;

export function useUpdateAssignment(options?: useDataConnectMutationOptions<UpdateAssignmentData, FirebaseError, UpdateAssignmentVariables>): UseDataConnectMutationResult<UpdateAssignmentData, UpdateAssignmentVariables>;
export function useUpdateAssignment(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateAssignmentData, FirebaseError, UpdateAssignmentVariables>): UseDataConnectMutationResult<UpdateAssignmentData, UpdateAssignmentVariables>;

export function useGetAssignment(vars: GetAssignmentVariables, options?: useDataConnectQueryOptions<GetAssignmentData>): UseDataConnectQueryResult<GetAssignmentData, GetAssignmentVariables>;
export function useGetAssignment(dc: DataConnect, vars: GetAssignmentVariables, options?: useDataConnectQueryOptions<GetAssignmentData>): UseDataConnectQueryResult<GetAssignmentData, GetAssignmentVariables>;

export function useListAssignments(vars: ListAssignmentsVariables, options?: useDataConnectQueryOptions<ListAssignmentsData>): UseDataConnectQueryResult<ListAssignmentsData, ListAssignmentsVariables>;
export function useListAssignments(dc: DataConnect, vars: ListAssignmentsVariables, options?: useDataConnectQueryOptions<ListAssignmentsData>): UseDataConnectQueryResult<ListAssignmentsData, ListAssignmentsVariables>;

export function useSubmitAssignment(options?: useDataConnectMutationOptions<SubmitAssignmentData, FirebaseError, SubmitAssignmentVariables>): UseDataConnectMutationResult<SubmitAssignmentData, SubmitAssignmentVariables>;
export function useSubmitAssignment(dc: DataConnect, options?: useDataConnectMutationOptions<SubmitAssignmentData, FirebaseError, SubmitAssignmentVariables>): UseDataConnectMutationResult<SubmitAssignmentData, SubmitAssignmentVariables>;

export function useDeleteSubmission(options?: useDataConnectMutationOptions<DeleteSubmissionData, FirebaseError, DeleteSubmissionVariables>): UseDataConnectMutationResult<DeleteSubmissionData, DeleteSubmissionVariables>;
export function useDeleteSubmission(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteSubmissionData, FirebaseError, DeleteSubmissionVariables>): UseDataConnectMutationResult<DeleteSubmissionData, DeleteSubmissionVariables>;

export function useUpdateGrade(options?: useDataConnectMutationOptions<UpdateGradeData, FirebaseError, UpdateGradeVariables>): UseDataConnectMutationResult<UpdateGradeData, UpdateGradeVariables>;
export function useUpdateGrade(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateGradeData, FirebaseError, UpdateGradeVariables>): UseDataConnectMutationResult<UpdateGradeData, UpdateGradeVariables>;

export function useGetSubmission(vars: GetSubmissionVariables, options?: useDataConnectQueryOptions<GetSubmissionData>): UseDataConnectQueryResult<GetSubmissionData, GetSubmissionVariables>;
export function useGetSubmission(dc: DataConnect, vars: GetSubmissionVariables, options?: useDataConnectQueryOptions<GetSubmissionData>): UseDataConnectQueryResult<GetSubmissionData, GetSubmissionVariables>;

export function useListMySubmissions(options?: useDataConnectQueryOptions<ListMySubmissionsData>): UseDataConnectQueryResult<ListMySubmissionsData, undefined>;
export function useListMySubmissions(dc: DataConnect, options?: useDataConnectQueryOptions<ListMySubmissionsData>): UseDataConnectQueryResult<ListMySubmissionsData, undefined>;

export function usePostDiscussion(options?: useDataConnectMutationOptions<PostDiscussionData, FirebaseError, PostDiscussionVariables>): UseDataConnectMutationResult<PostDiscussionData, PostDiscussionVariables>;
export function usePostDiscussion(dc: DataConnect, options?: useDataConnectMutationOptions<PostDiscussionData, FirebaseError, PostDiscussionVariables>): UseDataConnectMutationResult<PostDiscussionData, PostDiscussionVariables>;

export function useDeletePost(options?: useDataConnectMutationOptions<DeletePostData, FirebaseError, DeletePostVariables>): UseDataConnectMutationResult<DeletePostData, DeletePostVariables>;
export function useDeletePost(dc: DataConnect, options?: useDataConnectMutationOptions<DeletePostData, FirebaseError, DeletePostVariables>): UseDataConnectMutationResult<DeletePostData, DeletePostVariables>;

export function useUpdatePost(options?: useDataConnectMutationOptions<UpdatePostData, FirebaseError, UpdatePostVariables>): UseDataConnectMutationResult<UpdatePostData, UpdatePostVariables>;
export function useUpdatePost(dc: DataConnect, options?: useDataConnectMutationOptions<UpdatePostData, FirebaseError, UpdatePostVariables>): UseDataConnectMutationResult<UpdatePostData, UpdatePostVariables>;

export function useGetPost(vars: GetPostVariables, options?: useDataConnectQueryOptions<GetPostData>): UseDataConnectQueryResult<GetPostData, GetPostVariables>;
export function useGetPost(dc: DataConnect, vars: GetPostVariables, options?: useDataConnectQueryOptions<GetPostData>): UseDataConnectQueryResult<GetPostData, GetPostVariables>;

export function useListCoursePosts(vars: ListCoursePostsVariables, options?: useDataConnectQueryOptions<ListCoursePostsData>): UseDataConnectQueryResult<ListCoursePostsData, ListCoursePostsVariables>;
export function useListCoursePosts(dc: DataConnect, vars: ListCoursePostsVariables, options?: useDataConnectQueryOptions<ListCoursePostsData>): UseDataConnectQueryResult<ListCoursePostsData, ListCoursePostsVariables>;
