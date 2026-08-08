# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetCurrentUser*](#getcurrentuser)
  - [*ListAllUsers*](#listallusers)
  - [*GetCourse*](#getcourse)
  - [*ListCourses*](#listcourses)
  - [*GetEnrollment*](#getenrollment)
  - [*ListMyEnrollments*](#listmyenrollments)
  - [*GetAssignment*](#getassignment)
  - [*ListAssignments*](#listassignments)
  - [*GetSubmission*](#getsubmission)
  - [*ListMySubmissions*](#listmysubmissions)
  - [*GetPost*](#getpost)
  - [*ListCoursePosts*](#listcourseposts)
- [**Mutations**](#mutations)
  - [*CreateUserData*](#createuserdata)
  - [*DeleteUser*](#deleteuser)
  - [*UpdateUser*](#updateuser)
  - [*CreateCourse*](#createcourse)
  - [*DeleteCourse*](#deletecourse)
  - [*UpdateCourse*](#updatecourse)
  - [*Enroll*](#enroll)
  - [*DropCourse*](#dropcourse)
  - [*UpdateEnrollment*](#updateenrollment)
  - [*CreateAssignment*](#createassignment)
  - [*DeleteAssignment*](#deleteassignment)
  - [*UpdateAssignment*](#updateassignment)
  - [*SubmitAssignment*](#submitassignment)
  - [*DeleteSubmission*](#deletesubmission)
  - [*UpdateGrade*](#updategrade)
  - [*PostDiscussion*](#postdiscussion)
  - [*DeletePost*](#deletepost)
  - [*UpdatePost*](#updatepost)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetCurrentUser
You can execute the `GetCurrentUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCurrentUser(options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;

interface GetCurrentUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentUserData, undefined>;
}
export const getCurrentUserRef: GetCurrentUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCurrentUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;

interface GetCurrentUserRef {
  ...
  (dc: DataConnect): QueryRef<GetCurrentUserData, undefined>;
}
export const getCurrentUserRef: GetCurrentUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCurrentUserRef:
```typescript
const name = getCurrentUserRef.operationName;
console.log(name);
```

### Variables
The `GetCurrentUser` query has no variables.
### Return Type
Recall that executing the `GetCurrentUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCurrentUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetCurrentUserData {
  user?: {
    name: string;
    email: string;
    role: string;
  };
}
```
### Using `GetCurrentUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCurrentUser } from '@dataconnect/generated';


// Call the `getCurrentUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCurrentUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCurrentUser(dataConnect);

console.log(data.user);

// Or, you can use the `Promise` API.
getCurrentUser().then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetCurrentUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCurrentUserRef } from '@dataconnect/generated';


// Call the `getCurrentUserRef()` function to get a reference to the query.
const ref = getCurrentUserRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCurrentUserRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## ListAllUsers
You can execute the `ListAllUsers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAllUsers(options?: ExecuteQueryOptions): QueryPromise<ListAllUsersData, undefined>;

interface ListAllUsersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllUsersData, undefined>;
}
export const listAllUsersRef: ListAllUsersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAllUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAllUsersData, undefined>;

interface ListAllUsersRef {
  ...
  (dc: DataConnect): QueryRef<ListAllUsersData, undefined>;
}
export const listAllUsersRef: ListAllUsersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAllUsersRef:
```typescript
const name = listAllUsersRef.operationName;
console.log(name);
```

### Variables
The `ListAllUsers` query has no variables.
### Return Type
Recall that executing the `ListAllUsers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAllUsersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListAllUsersData {
  users: ({
    name: string;
    role: string;
  })[];
}
```
### Using `ListAllUsers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAllUsers } from '@dataconnect/generated';


// Call the `listAllUsers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAllUsers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAllUsers(dataConnect);

console.log(data.users);

// Or, you can use the `Promise` API.
listAllUsers().then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `ListAllUsers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAllUsersRef } from '@dataconnect/generated';


// Call the `listAllUsersRef()` function to get a reference to the query.
const ref = listAllUsersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAllUsersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## GetCourse
You can execute the `GetCourse` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCourse(vars: GetCourseVariables, options?: ExecuteQueryOptions): QueryPromise<GetCourseData, GetCourseVariables>;

interface GetCourseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCourseVariables): QueryRef<GetCourseData, GetCourseVariables>;
}
export const getCourseRef: GetCourseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCourse(dc: DataConnect, vars: GetCourseVariables, options?: ExecuteQueryOptions): QueryPromise<GetCourseData, GetCourseVariables>;

interface GetCourseRef {
  ...
  (dc: DataConnect, vars: GetCourseVariables): QueryRef<GetCourseData, GetCourseVariables>;
}
export const getCourseRef: GetCourseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCourseRef:
```typescript
const name = getCourseRef.operationName;
console.log(name);
```

### Variables
The `GetCourse` query requires an argument of type `GetCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetCourseVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetCourse` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCourseData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetCourseData {
  course?: {
    title: string;
    description: string;
  };
}
```
### Using `GetCourse`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCourse, GetCourseVariables } from '@dataconnect/generated';

// The `GetCourse` query requires an argument of type `GetCourseVariables`:
const getCourseVars: GetCourseVariables = {
  id: ..., 
};

// Call the `getCourse()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCourse(getCourseVars);
// Variables can be defined inline as well.
const { data } = await getCourse({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCourse(dataConnect, getCourseVars);

console.log(data.course);

// Or, you can use the `Promise` API.
getCourse(getCourseVars).then((response) => {
  const data = response.data;
  console.log(data.course);
});
```

### Using `GetCourse`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCourseRef, GetCourseVariables } from '@dataconnect/generated';

// The `GetCourse` query requires an argument of type `GetCourseVariables`:
const getCourseVars: GetCourseVariables = {
  id: ..., 
};

// Call the `getCourseRef()` function to get a reference to the query.
const ref = getCourseRef(getCourseVars);
// Variables can be defined inline as well.
const ref = getCourseRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCourseRef(dataConnect, getCourseVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.course);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.course);
});
```

## ListCourses
You can execute the `ListCourses` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listCourses(options?: ExecuteQueryOptions): QueryPromise<ListCoursesData, undefined>;

interface ListCoursesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListCoursesData, undefined>;
}
export const listCoursesRef: ListCoursesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listCourses(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListCoursesData, undefined>;

interface ListCoursesRef {
  ...
  (dc: DataConnect): QueryRef<ListCoursesData, undefined>;
}
export const listCoursesRef: ListCoursesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listCoursesRef:
```typescript
const name = listCoursesRef.operationName;
console.log(name);
```

### Variables
The `ListCourses` query has no variables.
### Return Type
Recall that executing the `ListCourses` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListCoursesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListCoursesData {
  courses: ({
    title: string;
  })[];
}
```
### Using `ListCourses`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listCourses } from '@dataconnect/generated';


// Call the `listCourses()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listCourses();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listCourses(dataConnect);

console.log(data.courses);

// Or, you can use the `Promise` API.
listCourses().then((response) => {
  const data = response.data;
  console.log(data.courses);
});
```

### Using `ListCourses`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listCoursesRef } from '@dataconnect/generated';


// Call the `listCoursesRef()` function to get a reference to the query.
const ref = listCoursesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listCoursesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.courses);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.courses);
});
```

## GetEnrollment
You can execute the `GetEnrollment` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getEnrollment(vars: GetEnrollmentVariables, options?: ExecuteQueryOptions): QueryPromise<GetEnrollmentData, GetEnrollmentVariables>;

interface GetEnrollmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetEnrollmentVariables): QueryRef<GetEnrollmentData, GetEnrollmentVariables>;
}
export const getEnrollmentRef: GetEnrollmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getEnrollment(dc: DataConnect, vars: GetEnrollmentVariables, options?: ExecuteQueryOptions): QueryPromise<GetEnrollmentData, GetEnrollmentVariables>;

interface GetEnrollmentRef {
  ...
  (dc: DataConnect, vars: GetEnrollmentVariables): QueryRef<GetEnrollmentData, GetEnrollmentVariables>;
}
export const getEnrollmentRef: GetEnrollmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getEnrollmentRef:
```typescript
const name = getEnrollmentRef.operationName;
console.log(name);
```

### Variables
The `GetEnrollment` query requires an argument of type `GetEnrollmentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetEnrollmentVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetEnrollment` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetEnrollmentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetEnrollmentData {
  enrollment?: {
    course: {
      title: string;
    };
    enrollmentDate: DateString;
  };
}
```
### Using `GetEnrollment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getEnrollment, GetEnrollmentVariables } from '@dataconnect/generated';

// The `GetEnrollment` query requires an argument of type `GetEnrollmentVariables`:
const getEnrollmentVars: GetEnrollmentVariables = {
  id: ..., 
};

// Call the `getEnrollment()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getEnrollment(getEnrollmentVars);
// Variables can be defined inline as well.
const { data } = await getEnrollment({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getEnrollment(dataConnect, getEnrollmentVars);

console.log(data.enrollment);

// Or, you can use the `Promise` API.
getEnrollment(getEnrollmentVars).then((response) => {
  const data = response.data;
  console.log(data.enrollment);
});
```

### Using `GetEnrollment`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getEnrollmentRef, GetEnrollmentVariables } from '@dataconnect/generated';

// The `GetEnrollment` query requires an argument of type `GetEnrollmentVariables`:
const getEnrollmentVars: GetEnrollmentVariables = {
  id: ..., 
};

// Call the `getEnrollmentRef()` function to get a reference to the query.
const ref = getEnrollmentRef(getEnrollmentVars);
// Variables can be defined inline as well.
const ref = getEnrollmentRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getEnrollmentRef(dataConnect, getEnrollmentVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.enrollment);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.enrollment);
});
```

## ListMyEnrollments
You can execute the `ListMyEnrollments` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMyEnrollments(options?: ExecuteQueryOptions): QueryPromise<ListMyEnrollmentsData, undefined>;

interface ListMyEnrollmentsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyEnrollmentsData, undefined>;
}
export const listMyEnrollmentsRef: ListMyEnrollmentsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMyEnrollments(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyEnrollmentsData, undefined>;

interface ListMyEnrollmentsRef {
  ...
  (dc: DataConnect): QueryRef<ListMyEnrollmentsData, undefined>;
}
export const listMyEnrollmentsRef: ListMyEnrollmentsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMyEnrollmentsRef:
```typescript
const name = listMyEnrollmentsRef.operationName;
console.log(name);
```

### Variables
The `ListMyEnrollments` query has no variables.
### Return Type
Recall that executing the `ListMyEnrollments` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMyEnrollmentsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListMyEnrollmentsData {
  enrollments: ({
    course: {
      title: string;
    };
  })[];
}
```
### Using `ListMyEnrollments`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMyEnrollments } from '@dataconnect/generated';


// Call the `listMyEnrollments()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMyEnrollments();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMyEnrollments(dataConnect);

console.log(data.enrollments);

// Or, you can use the `Promise` API.
listMyEnrollments().then((response) => {
  const data = response.data;
  console.log(data.enrollments);
});
```

### Using `ListMyEnrollments`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMyEnrollmentsRef } from '@dataconnect/generated';


// Call the `listMyEnrollmentsRef()` function to get a reference to the query.
const ref = listMyEnrollmentsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMyEnrollmentsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.enrollments);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.enrollments);
});
```

## GetAssignment
You can execute the `GetAssignment` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getAssignment(vars: GetAssignmentVariables, options?: ExecuteQueryOptions): QueryPromise<GetAssignmentData, GetAssignmentVariables>;

interface GetAssignmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAssignmentVariables): QueryRef<GetAssignmentData, GetAssignmentVariables>;
}
export const getAssignmentRef: GetAssignmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getAssignment(dc: DataConnect, vars: GetAssignmentVariables, options?: ExecuteQueryOptions): QueryPromise<GetAssignmentData, GetAssignmentVariables>;

interface GetAssignmentRef {
  ...
  (dc: DataConnect, vars: GetAssignmentVariables): QueryRef<GetAssignmentData, GetAssignmentVariables>;
}
export const getAssignmentRef: GetAssignmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getAssignmentRef:
```typescript
const name = getAssignmentRef.operationName;
console.log(name);
```

### Variables
The `GetAssignment` query requires an argument of type `GetAssignmentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetAssignmentVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetAssignment` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetAssignmentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetAssignmentData {
  assignment?: {
    title: string;
    dueDate: TimestampString;
  };
}
```
### Using `GetAssignment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getAssignment, GetAssignmentVariables } from '@dataconnect/generated';

// The `GetAssignment` query requires an argument of type `GetAssignmentVariables`:
const getAssignmentVars: GetAssignmentVariables = {
  id: ..., 
};

// Call the `getAssignment()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getAssignment(getAssignmentVars);
// Variables can be defined inline as well.
const { data } = await getAssignment({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getAssignment(dataConnect, getAssignmentVars);

console.log(data.assignment);

// Or, you can use the `Promise` API.
getAssignment(getAssignmentVars).then((response) => {
  const data = response.data;
  console.log(data.assignment);
});
```

### Using `GetAssignment`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getAssignmentRef, GetAssignmentVariables } from '@dataconnect/generated';

// The `GetAssignment` query requires an argument of type `GetAssignmentVariables`:
const getAssignmentVars: GetAssignmentVariables = {
  id: ..., 
};

// Call the `getAssignmentRef()` function to get a reference to the query.
const ref = getAssignmentRef(getAssignmentVars);
// Variables can be defined inline as well.
const ref = getAssignmentRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getAssignmentRef(dataConnect, getAssignmentVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.assignment);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.assignment);
});
```

## ListAssignments
You can execute the `ListAssignments` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAssignments(vars: ListAssignmentsVariables, options?: ExecuteQueryOptions): QueryPromise<ListAssignmentsData, ListAssignmentsVariables>;

interface ListAssignmentsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListAssignmentsVariables): QueryRef<ListAssignmentsData, ListAssignmentsVariables>;
}
export const listAssignmentsRef: ListAssignmentsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAssignments(dc: DataConnect, vars: ListAssignmentsVariables, options?: ExecuteQueryOptions): QueryPromise<ListAssignmentsData, ListAssignmentsVariables>;

interface ListAssignmentsRef {
  ...
  (dc: DataConnect, vars: ListAssignmentsVariables): QueryRef<ListAssignmentsData, ListAssignmentsVariables>;
}
export const listAssignmentsRef: ListAssignmentsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAssignmentsRef:
```typescript
const name = listAssignmentsRef.operationName;
console.log(name);
```

### Variables
The `ListAssignments` query requires an argument of type `ListAssignmentsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListAssignmentsVariables {
  courseId: UUIDString;
}
```
### Return Type
Recall that executing the `ListAssignments` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAssignmentsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListAssignmentsData {
  assignments: ({
    title: string;
  })[];
}
```
### Using `ListAssignments`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAssignments, ListAssignmentsVariables } from '@dataconnect/generated';

// The `ListAssignments` query requires an argument of type `ListAssignmentsVariables`:
const listAssignmentsVars: ListAssignmentsVariables = {
  courseId: ..., 
};

// Call the `listAssignments()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAssignments(listAssignmentsVars);
// Variables can be defined inline as well.
const { data } = await listAssignments({ courseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAssignments(dataConnect, listAssignmentsVars);

console.log(data.assignments);

// Or, you can use the `Promise` API.
listAssignments(listAssignmentsVars).then((response) => {
  const data = response.data;
  console.log(data.assignments);
});
```

### Using `ListAssignments`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAssignmentsRef, ListAssignmentsVariables } from '@dataconnect/generated';

// The `ListAssignments` query requires an argument of type `ListAssignmentsVariables`:
const listAssignmentsVars: ListAssignmentsVariables = {
  courseId: ..., 
};

// Call the `listAssignmentsRef()` function to get a reference to the query.
const ref = listAssignmentsRef(listAssignmentsVars);
// Variables can be defined inline as well.
const ref = listAssignmentsRef({ courseId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAssignmentsRef(dataConnect, listAssignmentsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.assignments);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.assignments);
});
```

## GetSubmission
You can execute the `GetSubmission` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getSubmission(vars: GetSubmissionVariables, options?: ExecuteQueryOptions): QueryPromise<GetSubmissionData, GetSubmissionVariables>;

interface GetSubmissionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetSubmissionVariables): QueryRef<GetSubmissionData, GetSubmissionVariables>;
}
export const getSubmissionRef: GetSubmissionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getSubmission(dc: DataConnect, vars: GetSubmissionVariables, options?: ExecuteQueryOptions): QueryPromise<GetSubmissionData, GetSubmissionVariables>;

interface GetSubmissionRef {
  ...
  (dc: DataConnect, vars: GetSubmissionVariables): QueryRef<GetSubmissionData, GetSubmissionVariables>;
}
export const getSubmissionRef: GetSubmissionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getSubmissionRef:
```typescript
const name = getSubmissionRef.operationName;
console.log(name);
```

### Variables
The `GetSubmission` query requires an argument of type `GetSubmissionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetSubmissionVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetSubmission` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetSubmissionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetSubmissionData {
  submission?: {
    submissionUrl: string;
    grade?: number | null;
    instructorFeedback?: string | null;
  };
}
```
### Using `GetSubmission`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getSubmission, GetSubmissionVariables } from '@dataconnect/generated';

// The `GetSubmission` query requires an argument of type `GetSubmissionVariables`:
const getSubmissionVars: GetSubmissionVariables = {
  id: ..., 
};

// Call the `getSubmission()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getSubmission(getSubmissionVars);
// Variables can be defined inline as well.
const { data } = await getSubmission({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getSubmission(dataConnect, getSubmissionVars);

console.log(data.submission);

// Or, you can use the `Promise` API.
getSubmission(getSubmissionVars).then((response) => {
  const data = response.data;
  console.log(data.submission);
});
```

### Using `GetSubmission`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getSubmissionRef, GetSubmissionVariables } from '@dataconnect/generated';

// The `GetSubmission` query requires an argument of type `GetSubmissionVariables`:
const getSubmissionVars: GetSubmissionVariables = {
  id: ..., 
};

// Call the `getSubmissionRef()` function to get a reference to the query.
const ref = getSubmissionRef(getSubmissionVars);
// Variables can be defined inline as well.
const ref = getSubmissionRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getSubmissionRef(dataConnect, getSubmissionVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.submission);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.submission);
});
```

## ListMySubmissions
You can execute the `ListMySubmissions` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMySubmissions(options?: ExecuteQueryOptions): QueryPromise<ListMySubmissionsData, undefined>;

interface ListMySubmissionsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMySubmissionsData, undefined>;
}
export const listMySubmissionsRef: ListMySubmissionsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMySubmissions(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMySubmissionsData, undefined>;

interface ListMySubmissionsRef {
  ...
  (dc: DataConnect): QueryRef<ListMySubmissionsData, undefined>;
}
export const listMySubmissionsRef: ListMySubmissionsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMySubmissionsRef:
```typescript
const name = listMySubmissionsRef.operationName;
console.log(name);
```

### Variables
The `ListMySubmissions` query has no variables.
### Return Type
Recall that executing the `ListMySubmissions` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMySubmissionsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListMySubmissionsData {
  submissions: ({
    assignment: {
      title: string;
    };
    grade?: number | null;
  })[];
}
```
### Using `ListMySubmissions`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMySubmissions } from '@dataconnect/generated';


// Call the `listMySubmissions()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMySubmissions();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMySubmissions(dataConnect);

console.log(data.submissions);

// Or, you can use the `Promise` API.
listMySubmissions().then((response) => {
  const data = response.data;
  console.log(data.submissions);
});
```

### Using `ListMySubmissions`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMySubmissionsRef } from '@dataconnect/generated';


// Call the `listMySubmissionsRef()` function to get a reference to the query.
const ref = listMySubmissionsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMySubmissionsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.submissions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.submissions);
});
```

## GetPost
You can execute the `GetPost` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getPost(vars: GetPostVariables, options?: ExecuteQueryOptions): QueryPromise<GetPostData, GetPostVariables>;

interface GetPostRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPostVariables): QueryRef<GetPostData, GetPostVariables>;
}
export const getPostRef: GetPostRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getPost(dc: DataConnect, vars: GetPostVariables, options?: ExecuteQueryOptions): QueryPromise<GetPostData, GetPostVariables>;

interface GetPostRef {
  ...
  (dc: DataConnect, vars: GetPostVariables): QueryRef<GetPostData, GetPostVariables>;
}
export const getPostRef: GetPostRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getPostRef:
```typescript
const name = getPostRef.operationName;
console.log(name);
```

### Variables
The `GetPost` query requires an argument of type `GetPostVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetPostVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetPost` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetPostData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetPostData {
  discussionPost?: {
    content: string;
    user: {
      name: string;
    };
  };
}
```
### Using `GetPost`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getPost, GetPostVariables } from '@dataconnect/generated';

// The `GetPost` query requires an argument of type `GetPostVariables`:
const getPostVars: GetPostVariables = {
  id: ..., 
};

// Call the `getPost()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getPost(getPostVars);
// Variables can be defined inline as well.
const { data } = await getPost({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getPost(dataConnect, getPostVars);

console.log(data.discussionPost);

// Or, you can use the `Promise` API.
getPost(getPostVars).then((response) => {
  const data = response.data;
  console.log(data.discussionPost);
});
```

### Using `GetPost`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getPostRef, GetPostVariables } from '@dataconnect/generated';

// The `GetPost` query requires an argument of type `GetPostVariables`:
const getPostVars: GetPostVariables = {
  id: ..., 
};

// Call the `getPostRef()` function to get a reference to the query.
const ref = getPostRef(getPostVars);
// Variables can be defined inline as well.
const ref = getPostRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getPostRef(dataConnect, getPostVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.discussionPost);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.discussionPost);
});
```

## ListCoursePosts
You can execute the `ListCoursePosts` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listCoursePosts(vars: ListCoursePostsVariables, options?: ExecuteQueryOptions): QueryPromise<ListCoursePostsData, ListCoursePostsVariables>;

interface ListCoursePostsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListCoursePostsVariables): QueryRef<ListCoursePostsData, ListCoursePostsVariables>;
}
export const listCoursePostsRef: ListCoursePostsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listCoursePosts(dc: DataConnect, vars: ListCoursePostsVariables, options?: ExecuteQueryOptions): QueryPromise<ListCoursePostsData, ListCoursePostsVariables>;

interface ListCoursePostsRef {
  ...
  (dc: DataConnect, vars: ListCoursePostsVariables): QueryRef<ListCoursePostsData, ListCoursePostsVariables>;
}
export const listCoursePostsRef: ListCoursePostsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listCoursePostsRef:
```typescript
const name = listCoursePostsRef.operationName;
console.log(name);
```

### Variables
The `ListCoursePosts` query requires an argument of type `ListCoursePostsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListCoursePostsVariables {
  courseId: UUIDString;
}
```
### Return Type
Recall that executing the `ListCoursePosts` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListCoursePostsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListCoursePostsData {
  discussionPosts: ({
    content: string;
    timestamp?: TimestampString | null;
  })[];
}
```
### Using `ListCoursePosts`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listCoursePosts, ListCoursePostsVariables } from '@dataconnect/generated';

// The `ListCoursePosts` query requires an argument of type `ListCoursePostsVariables`:
const listCoursePostsVars: ListCoursePostsVariables = {
  courseId: ..., 
};

// Call the `listCoursePosts()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listCoursePosts(listCoursePostsVars);
// Variables can be defined inline as well.
const { data } = await listCoursePosts({ courseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listCoursePosts(dataConnect, listCoursePostsVars);

console.log(data.discussionPosts);

// Or, you can use the `Promise` API.
listCoursePosts(listCoursePostsVars).then((response) => {
  const data = response.data;
  console.log(data.discussionPosts);
});
```

### Using `ListCoursePosts`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listCoursePostsRef, ListCoursePostsVariables } from '@dataconnect/generated';

// The `ListCoursePosts` query requires an argument of type `ListCoursePostsVariables`:
const listCoursePostsVars: ListCoursePostsVariables = {
  courseId: ..., 
};

// Call the `listCoursePostsRef()` function to get a reference to the query.
const ref = listCoursePostsRef(listCoursePostsVars);
// Variables can be defined inline as well.
const ref = listCoursePostsRef({ courseId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listCoursePostsRef(dataConnect, listCoursePostsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.discussionPosts);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.discussionPosts);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateUserData
You can execute the `CreateUserData` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createUserData(): MutationPromise<CreateUserDataData, undefined>;

interface CreateUserDataRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateUserDataData, undefined>;
}
export const createUserDataRef: CreateUserDataRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUserData(dc: DataConnect): MutationPromise<CreateUserDataData, undefined>;

interface CreateUserDataRef {
  ...
  (dc: DataConnect): MutationRef<CreateUserDataData, undefined>;
}
export const createUserDataRef: CreateUserDataRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserDataRef:
```typescript
const name = createUserDataRef.operationName;
console.log(name);
```

### Variables
The `CreateUserData` mutation has no variables.
### Return Type
Recall that executing the `CreateUserData` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserDataData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserDataData {
  user_insert: User_Key;
}
```
### Using `CreateUserData`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUserData } from '@dataconnect/generated';


// Call the `createUserData()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUserData();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUserData(dataConnect);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUserData().then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUserData`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserDataRef } from '@dataconnect/generated';


// Call the `createUserDataRef()` function to get a reference to the mutation.
const ref = createUserDataRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserDataRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## DeleteUser
You can execute the `DeleteUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteUser(): MutationPromise<DeleteUserData, undefined>;

interface DeleteUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteUserData, undefined>;
}
export const deleteUserRef: DeleteUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteUser(dc: DataConnect): MutationPromise<DeleteUserData, undefined>;

interface DeleteUserRef {
  ...
  (dc: DataConnect): MutationRef<DeleteUserData, undefined>;
}
export const deleteUserRef: DeleteUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteUserRef:
```typescript
const name = deleteUserRef.operationName;
console.log(name);
```

### Variables
The `DeleteUser` mutation has no variables.
### Return Type
Recall that executing the `DeleteUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteUserData {
  user_delete?: User_Key | null;
}
```
### Using `DeleteUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteUser } from '@dataconnect/generated';


// Call the `deleteUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteUser(dataConnect);

console.log(data.user_delete);

// Or, you can use the `Promise` API.
deleteUser().then((response) => {
  const data = response.data;
  console.log(data.user_delete);
});
```

### Using `DeleteUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteUserRef } from '@dataconnect/generated';


// Call the `deleteUserRef()` function to get a reference to the mutation.
const ref = deleteUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_delete);
});
```

## UpdateUser
You can execute the `UpdateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateUser(vars: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface UpdateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
}
export const updateUserRef: UpdateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateUser(dc: DataConnect, vars: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface UpdateUserRef {
  ...
  (dc: DataConnect, vars: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
}
export const updateUserRef: UpdateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateUserRef:
```typescript
const name = updateUserRef.operationName;
console.log(name);
```

### Variables
The `UpdateUser` mutation requires an argument of type `UpdateUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateUserVariables {
  name: string;
}
```
### Return Type
Recall that executing the `UpdateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateUserData {
  user_update?: User_Key | null;
}
```
### Using `UpdateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateUser, UpdateUserVariables } from '@dataconnect/generated';

// The `UpdateUser` mutation requires an argument of type `UpdateUserVariables`:
const updateUserVars: UpdateUserVariables = {
  name: ..., 
};

// Call the `updateUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateUser(updateUserVars);
// Variables can be defined inline as well.
const { data } = await updateUser({ name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateUser(dataConnect, updateUserVars);

console.log(data.user_update);

// Or, you can use the `Promise` API.
updateUser(updateUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `UpdateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateUserRef, UpdateUserVariables } from '@dataconnect/generated';

// The `UpdateUser` mutation requires an argument of type `UpdateUserVariables`:
const updateUserVars: UpdateUserVariables = {
  name: ..., 
};

// Call the `updateUserRef()` function to get a reference to the mutation.
const ref = updateUserRef(updateUserVars);
// Variables can be defined inline as well.
const ref = updateUserRef({ name: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateUserRef(dataConnect, updateUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

## CreateCourse
You can execute the `CreateCourse` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createCourse(vars: CreateCourseVariables): MutationPromise<CreateCourseData, CreateCourseVariables>;

interface CreateCourseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateCourseVariables): MutationRef<CreateCourseData, CreateCourseVariables>;
}
export const createCourseRef: CreateCourseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createCourse(dc: DataConnect, vars: CreateCourseVariables): MutationPromise<CreateCourseData, CreateCourseVariables>;

interface CreateCourseRef {
  ...
  (dc: DataConnect, vars: CreateCourseVariables): MutationRef<CreateCourseData, CreateCourseVariables>;
}
export const createCourseRef: CreateCourseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createCourseRef:
```typescript
const name = createCourseRef.operationName;
console.log(name);
```

### Variables
The `CreateCourse` mutation requires an argument of type `CreateCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateCourseVariables {
  title: string;
  description: string;
}
```
### Return Type
Recall that executing the `CreateCourse` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateCourseData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateCourseData {
  course_insert: Course_Key;
}
```
### Using `CreateCourse`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createCourse, CreateCourseVariables } from '@dataconnect/generated';

// The `CreateCourse` mutation requires an argument of type `CreateCourseVariables`:
const createCourseVars: CreateCourseVariables = {
  title: ..., 
  description: ..., 
};

// Call the `createCourse()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createCourse(createCourseVars);
// Variables can be defined inline as well.
const { data } = await createCourse({ title: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createCourse(dataConnect, createCourseVars);

console.log(data.course_insert);

// Or, you can use the `Promise` API.
createCourse(createCourseVars).then((response) => {
  const data = response.data;
  console.log(data.course_insert);
});
```

### Using `CreateCourse`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createCourseRef, CreateCourseVariables } from '@dataconnect/generated';

// The `CreateCourse` mutation requires an argument of type `CreateCourseVariables`:
const createCourseVars: CreateCourseVariables = {
  title: ..., 
  description: ..., 
};

// Call the `createCourseRef()` function to get a reference to the mutation.
const ref = createCourseRef(createCourseVars);
// Variables can be defined inline as well.
const ref = createCourseRef({ title: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createCourseRef(dataConnect, createCourseVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.course_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.course_insert);
});
```

## DeleteCourse
You can execute the `DeleteCourse` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteCourse(vars: DeleteCourseVariables): MutationPromise<DeleteCourseData, DeleteCourseVariables>;

interface DeleteCourseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteCourseVariables): MutationRef<DeleteCourseData, DeleteCourseVariables>;
}
export const deleteCourseRef: DeleteCourseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteCourse(dc: DataConnect, vars: DeleteCourseVariables): MutationPromise<DeleteCourseData, DeleteCourseVariables>;

interface DeleteCourseRef {
  ...
  (dc: DataConnect, vars: DeleteCourseVariables): MutationRef<DeleteCourseData, DeleteCourseVariables>;
}
export const deleteCourseRef: DeleteCourseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteCourseRef:
```typescript
const name = deleteCourseRef.operationName;
console.log(name);
```

### Variables
The `DeleteCourse` mutation requires an argument of type `DeleteCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteCourseVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteCourse` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteCourseData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteCourseData {
  course_delete?: Course_Key | null;
}
```
### Using `DeleteCourse`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteCourse, DeleteCourseVariables } from '@dataconnect/generated';

// The `DeleteCourse` mutation requires an argument of type `DeleteCourseVariables`:
const deleteCourseVars: DeleteCourseVariables = {
  id: ..., 
};

// Call the `deleteCourse()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteCourse(deleteCourseVars);
// Variables can be defined inline as well.
const { data } = await deleteCourse({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteCourse(dataConnect, deleteCourseVars);

console.log(data.course_delete);

// Or, you can use the `Promise` API.
deleteCourse(deleteCourseVars).then((response) => {
  const data = response.data;
  console.log(data.course_delete);
});
```

### Using `DeleteCourse`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteCourseRef, DeleteCourseVariables } from '@dataconnect/generated';

// The `DeleteCourse` mutation requires an argument of type `DeleteCourseVariables`:
const deleteCourseVars: DeleteCourseVariables = {
  id: ..., 
};

// Call the `deleteCourseRef()` function to get a reference to the mutation.
const ref = deleteCourseRef(deleteCourseVars);
// Variables can be defined inline as well.
const ref = deleteCourseRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteCourseRef(dataConnect, deleteCourseVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.course_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.course_delete);
});
```

## UpdateCourse
You can execute the `UpdateCourse` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateCourse(vars: UpdateCourseVariables): MutationPromise<UpdateCourseData, UpdateCourseVariables>;

interface UpdateCourseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateCourseVariables): MutationRef<UpdateCourseData, UpdateCourseVariables>;
}
export const updateCourseRef: UpdateCourseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateCourse(dc: DataConnect, vars: UpdateCourseVariables): MutationPromise<UpdateCourseData, UpdateCourseVariables>;

interface UpdateCourseRef {
  ...
  (dc: DataConnect, vars: UpdateCourseVariables): MutationRef<UpdateCourseData, UpdateCourseVariables>;
}
export const updateCourseRef: UpdateCourseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateCourseRef:
```typescript
const name = updateCourseRef.operationName;
console.log(name);
```

### Variables
The `UpdateCourse` mutation requires an argument of type `UpdateCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateCourseVariables {
  id: UUIDString;
  title?: string | null;
}
```
### Return Type
Recall that executing the `UpdateCourse` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateCourseData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateCourseData {
  course_update?: Course_Key | null;
}
```
### Using `UpdateCourse`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateCourse, UpdateCourseVariables } from '@dataconnect/generated';

// The `UpdateCourse` mutation requires an argument of type `UpdateCourseVariables`:
const updateCourseVars: UpdateCourseVariables = {
  id: ..., 
  title: ..., // optional
};

// Call the `updateCourse()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateCourse(updateCourseVars);
// Variables can be defined inline as well.
const { data } = await updateCourse({ id: ..., title: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateCourse(dataConnect, updateCourseVars);

console.log(data.course_update);

// Or, you can use the `Promise` API.
updateCourse(updateCourseVars).then((response) => {
  const data = response.data;
  console.log(data.course_update);
});
```

### Using `UpdateCourse`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateCourseRef, UpdateCourseVariables } from '@dataconnect/generated';

// The `UpdateCourse` mutation requires an argument of type `UpdateCourseVariables`:
const updateCourseVars: UpdateCourseVariables = {
  id: ..., 
  title: ..., // optional
};

// Call the `updateCourseRef()` function to get a reference to the mutation.
const ref = updateCourseRef(updateCourseVars);
// Variables can be defined inline as well.
const ref = updateCourseRef({ id: ..., title: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateCourseRef(dataConnect, updateCourseVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.course_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.course_update);
});
```

## Enroll
You can execute the `Enroll` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
enroll(vars: EnrollVariables): MutationPromise<EnrollData, EnrollVariables>;

interface EnrollRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: EnrollVariables): MutationRef<EnrollData, EnrollVariables>;
}
export const enrollRef: EnrollRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
enroll(dc: DataConnect, vars: EnrollVariables): MutationPromise<EnrollData, EnrollVariables>;

interface EnrollRef {
  ...
  (dc: DataConnect, vars: EnrollVariables): MutationRef<EnrollData, EnrollVariables>;
}
export const enrollRef: EnrollRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the enrollRef:
```typescript
const name = enrollRef.operationName;
console.log(name);
```

### Variables
The `Enroll` mutation requires an argument of type `EnrollVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface EnrollVariables {
  courseId: UUIDString;
}
```
### Return Type
Recall that executing the `Enroll` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `EnrollData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface EnrollData {
  enrollment_insert: Enrollment_Key;
}
```
### Using `Enroll`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, enroll, EnrollVariables } from '@dataconnect/generated';

// The `Enroll` mutation requires an argument of type `EnrollVariables`:
const enrollVars: EnrollVariables = {
  courseId: ..., 
};

// Call the `enroll()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await enroll(enrollVars);
// Variables can be defined inline as well.
const { data } = await enroll({ courseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await enroll(dataConnect, enrollVars);

console.log(data.enrollment_insert);

// Or, you can use the `Promise` API.
enroll(enrollVars).then((response) => {
  const data = response.data;
  console.log(data.enrollment_insert);
});
```

### Using `Enroll`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, enrollRef, EnrollVariables } from '@dataconnect/generated';

// The `Enroll` mutation requires an argument of type `EnrollVariables`:
const enrollVars: EnrollVariables = {
  courseId: ..., 
};

// Call the `enrollRef()` function to get a reference to the mutation.
const ref = enrollRef(enrollVars);
// Variables can be defined inline as well.
const ref = enrollRef({ courseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = enrollRef(dataConnect, enrollVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.enrollment_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.enrollment_insert);
});
```

## DropCourse
You can execute the `DropCourse` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
dropCourse(vars: DropCourseVariables): MutationPromise<DropCourseData, DropCourseVariables>;

interface DropCourseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DropCourseVariables): MutationRef<DropCourseData, DropCourseVariables>;
}
export const dropCourseRef: DropCourseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
dropCourse(dc: DataConnect, vars: DropCourseVariables): MutationPromise<DropCourseData, DropCourseVariables>;

interface DropCourseRef {
  ...
  (dc: DataConnect, vars: DropCourseVariables): MutationRef<DropCourseData, DropCourseVariables>;
}
export const dropCourseRef: DropCourseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the dropCourseRef:
```typescript
const name = dropCourseRef.operationName;
console.log(name);
```

### Variables
The `DropCourse` mutation requires an argument of type `DropCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DropCourseVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DropCourse` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DropCourseData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DropCourseData {
  enrollment_delete?: Enrollment_Key | null;
}
```
### Using `DropCourse`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, dropCourse, DropCourseVariables } from '@dataconnect/generated';

// The `DropCourse` mutation requires an argument of type `DropCourseVariables`:
const dropCourseVars: DropCourseVariables = {
  id: ..., 
};

// Call the `dropCourse()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await dropCourse(dropCourseVars);
// Variables can be defined inline as well.
const { data } = await dropCourse({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await dropCourse(dataConnect, dropCourseVars);

console.log(data.enrollment_delete);

// Or, you can use the `Promise` API.
dropCourse(dropCourseVars).then((response) => {
  const data = response.data;
  console.log(data.enrollment_delete);
});
```

### Using `DropCourse`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, dropCourseRef, DropCourseVariables } from '@dataconnect/generated';

// The `DropCourse` mutation requires an argument of type `DropCourseVariables`:
const dropCourseVars: DropCourseVariables = {
  id: ..., 
};

// Call the `dropCourseRef()` function to get a reference to the mutation.
const ref = dropCourseRef(dropCourseVars);
// Variables can be defined inline as well.
const ref = dropCourseRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = dropCourseRef(dataConnect, dropCourseVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.enrollment_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.enrollment_delete);
});
```

## UpdateEnrollment
You can execute the `UpdateEnrollment` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateEnrollment(vars: UpdateEnrollmentVariables): MutationPromise<UpdateEnrollmentData, UpdateEnrollmentVariables>;

interface UpdateEnrollmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateEnrollmentVariables): MutationRef<UpdateEnrollmentData, UpdateEnrollmentVariables>;
}
export const updateEnrollmentRef: UpdateEnrollmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateEnrollment(dc: DataConnect, vars: UpdateEnrollmentVariables): MutationPromise<UpdateEnrollmentData, UpdateEnrollmentVariables>;

interface UpdateEnrollmentRef {
  ...
  (dc: DataConnect, vars: UpdateEnrollmentVariables): MutationRef<UpdateEnrollmentData, UpdateEnrollmentVariables>;
}
export const updateEnrollmentRef: UpdateEnrollmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateEnrollmentRef:
```typescript
const name = updateEnrollmentRef.operationName;
console.log(name);
```

### Variables
The `UpdateEnrollment` mutation requires an argument of type `UpdateEnrollmentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateEnrollmentVariables {
  id: UUIDString;
  date: DateString;
}
```
### Return Type
Recall that executing the `UpdateEnrollment` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateEnrollmentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateEnrollmentData {
  enrollment_update?: Enrollment_Key | null;
}
```
### Using `UpdateEnrollment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateEnrollment, UpdateEnrollmentVariables } from '@dataconnect/generated';

// The `UpdateEnrollment` mutation requires an argument of type `UpdateEnrollmentVariables`:
const updateEnrollmentVars: UpdateEnrollmentVariables = {
  id: ..., 
  date: ..., 
};

// Call the `updateEnrollment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateEnrollment(updateEnrollmentVars);
// Variables can be defined inline as well.
const { data } = await updateEnrollment({ id: ..., date: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateEnrollment(dataConnect, updateEnrollmentVars);

console.log(data.enrollment_update);

// Or, you can use the `Promise` API.
updateEnrollment(updateEnrollmentVars).then((response) => {
  const data = response.data;
  console.log(data.enrollment_update);
});
```

### Using `UpdateEnrollment`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateEnrollmentRef, UpdateEnrollmentVariables } from '@dataconnect/generated';

// The `UpdateEnrollment` mutation requires an argument of type `UpdateEnrollmentVariables`:
const updateEnrollmentVars: UpdateEnrollmentVariables = {
  id: ..., 
  date: ..., 
};

// Call the `updateEnrollmentRef()` function to get a reference to the mutation.
const ref = updateEnrollmentRef(updateEnrollmentVars);
// Variables can be defined inline as well.
const ref = updateEnrollmentRef({ id: ..., date: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateEnrollmentRef(dataConnect, updateEnrollmentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.enrollment_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.enrollment_update);
});
```

## CreateAssignment
You can execute the `CreateAssignment` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createAssignment(vars: CreateAssignmentVariables): MutationPromise<CreateAssignmentData, CreateAssignmentVariables>;

interface CreateAssignmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAssignmentVariables): MutationRef<CreateAssignmentData, CreateAssignmentVariables>;
}
export const createAssignmentRef: CreateAssignmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createAssignment(dc: DataConnect, vars: CreateAssignmentVariables): MutationPromise<CreateAssignmentData, CreateAssignmentVariables>;

interface CreateAssignmentRef {
  ...
  (dc: DataConnect, vars: CreateAssignmentVariables): MutationRef<CreateAssignmentData, CreateAssignmentVariables>;
}
export const createAssignmentRef: CreateAssignmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createAssignmentRef:
```typescript
const name = createAssignmentRef.operationName;
console.log(name);
```

### Variables
The `CreateAssignment` mutation requires an argument of type `CreateAssignmentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateAssignmentVariables {
  courseId: UUIDString;
  title: string;
  dueDate: TimestampString;
}
```
### Return Type
Recall that executing the `CreateAssignment` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateAssignmentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateAssignmentData {
  assignment_insert: Assignment_Key;
}
```
### Using `CreateAssignment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createAssignment, CreateAssignmentVariables } from '@dataconnect/generated';

// The `CreateAssignment` mutation requires an argument of type `CreateAssignmentVariables`:
const createAssignmentVars: CreateAssignmentVariables = {
  courseId: ..., 
  title: ..., 
  dueDate: ..., 
};

// Call the `createAssignment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createAssignment(createAssignmentVars);
// Variables can be defined inline as well.
const { data } = await createAssignment({ courseId: ..., title: ..., dueDate: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createAssignment(dataConnect, createAssignmentVars);

console.log(data.assignment_insert);

// Or, you can use the `Promise` API.
createAssignment(createAssignmentVars).then((response) => {
  const data = response.data;
  console.log(data.assignment_insert);
});
```

### Using `CreateAssignment`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createAssignmentRef, CreateAssignmentVariables } from '@dataconnect/generated';

// The `CreateAssignment` mutation requires an argument of type `CreateAssignmentVariables`:
const createAssignmentVars: CreateAssignmentVariables = {
  courseId: ..., 
  title: ..., 
  dueDate: ..., 
};

// Call the `createAssignmentRef()` function to get a reference to the mutation.
const ref = createAssignmentRef(createAssignmentVars);
// Variables can be defined inline as well.
const ref = createAssignmentRef({ courseId: ..., title: ..., dueDate: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createAssignmentRef(dataConnect, createAssignmentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.assignment_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.assignment_insert);
});
```

## DeleteAssignment
You can execute the `DeleteAssignment` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteAssignment(vars: DeleteAssignmentVariables): MutationPromise<DeleteAssignmentData, DeleteAssignmentVariables>;

interface DeleteAssignmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteAssignmentVariables): MutationRef<DeleteAssignmentData, DeleteAssignmentVariables>;
}
export const deleteAssignmentRef: DeleteAssignmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteAssignment(dc: DataConnect, vars: DeleteAssignmentVariables): MutationPromise<DeleteAssignmentData, DeleteAssignmentVariables>;

interface DeleteAssignmentRef {
  ...
  (dc: DataConnect, vars: DeleteAssignmentVariables): MutationRef<DeleteAssignmentData, DeleteAssignmentVariables>;
}
export const deleteAssignmentRef: DeleteAssignmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteAssignmentRef:
```typescript
const name = deleteAssignmentRef.operationName;
console.log(name);
```

### Variables
The `DeleteAssignment` mutation requires an argument of type `DeleteAssignmentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteAssignmentVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteAssignment` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteAssignmentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteAssignmentData {
  assignment_delete?: Assignment_Key | null;
}
```
### Using `DeleteAssignment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteAssignment, DeleteAssignmentVariables } from '@dataconnect/generated';

// The `DeleteAssignment` mutation requires an argument of type `DeleteAssignmentVariables`:
const deleteAssignmentVars: DeleteAssignmentVariables = {
  id: ..., 
};

// Call the `deleteAssignment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteAssignment(deleteAssignmentVars);
// Variables can be defined inline as well.
const { data } = await deleteAssignment({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteAssignment(dataConnect, deleteAssignmentVars);

console.log(data.assignment_delete);

// Or, you can use the `Promise` API.
deleteAssignment(deleteAssignmentVars).then((response) => {
  const data = response.data;
  console.log(data.assignment_delete);
});
```

### Using `DeleteAssignment`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteAssignmentRef, DeleteAssignmentVariables } from '@dataconnect/generated';

// The `DeleteAssignment` mutation requires an argument of type `DeleteAssignmentVariables`:
const deleteAssignmentVars: DeleteAssignmentVariables = {
  id: ..., 
};

// Call the `deleteAssignmentRef()` function to get a reference to the mutation.
const ref = deleteAssignmentRef(deleteAssignmentVars);
// Variables can be defined inline as well.
const ref = deleteAssignmentRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteAssignmentRef(dataConnect, deleteAssignmentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.assignment_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.assignment_delete);
});
```

## UpdateAssignment
You can execute the `UpdateAssignment` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateAssignment(vars: UpdateAssignmentVariables): MutationPromise<UpdateAssignmentData, UpdateAssignmentVariables>;

interface UpdateAssignmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateAssignmentVariables): MutationRef<UpdateAssignmentData, UpdateAssignmentVariables>;
}
export const updateAssignmentRef: UpdateAssignmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateAssignment(dc: DataConnect, vars: UpdateAssignmentVariables): MutationPromise<UpdateAssignmentData, UpdateAssignmentVariables>;

interface UpdateAssignmentRef {
  ...
  (dc: DataConnect, vars: UpdateAssignmentVariables): MutationRef<UpdateAssignmentData, UpdateAssignmentVariables>;
}
export const updateAssignmentRef: UpdateAssignmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateAssignmentRef:
```typescript
const name = updateAssignmentRef.operationName;
console.log(name);
```

### Variables
The `UpdateAssignment` mutation requires an argument of type `UpdateAssignmentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateAssignmentVariables {
  id: UUIDString;
  maxPoints?: number | null;
}
```
### Return Type
Recall that executing the `UpdateAssignment` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateAssignmentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateAssignmentData {
  assignment_update?: Assignment_Key | null;
}
```
### Using `UpdateAssignment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateAssignment, UpdateAssignmentVariables } from '@dataconnect/generated';

// The `UpdateAssignment` mutation requires an argument of type `UpdateAssignmentVariables`:
const updateAssignmentVars: UpdateAssignmentVariables = {
  id: ..., 
  maxPoints: ..., // optional
};

// Call the `updateAssignment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateAssignment(updateAssignmentVars);
// Variables can be defined inline as well.
const { data } = await updateAssignment({ id: ..., maxPoints: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateAssignment(dataConnect, updateAssignmentVars);

console.log(data.assignment_update);

// Or, you can use the `Promise` API.
updateAssignment(updateAssignmentVars).then((response) => {
  const data = response.data;
  console.log(data.assignment_update);
});
```

### Using `UpdateAssignment`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateAssignmentRef, UpdateAssignmentVariables } from '@dataconnect/generated';

// The `UpdateAssignment` mutation requires an argument of type `UpdateAssignmentVariables`:
const updateAssignmentVars: UpdateAssignmentVariables = {
  id: ..., 
  maxPoints: ..., // optional
};

// Call the `updateAssignmentRef()` function to get a reference to the mutation.
const ref = updateAssignmentRef(updateAssignmentVars);
// Variables can be defined inline as well.
const ref = updateAssignmentRef({ id: ..., maxPoints: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateAssignmentRef(dataConnect, updateAssignmentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.assignment_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.assignment_update);
});
```

## SubmitAssignment
You can execute the `SubmitAssignment` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
submitAssignment(vars: SubmitAssignmentVariables): MutationPromise<SubmitAssignmentData, SubmitAssignmentVariables>;

interface SubmitAssignmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SubmitAssignmentVariables): MutationRef<SubmitAssignmentData, SubmitAssignmentVariables>;
}
export const submitAssignmentRef: SubmitAssignmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
submitAssignment(dc: DataConnect, vars: SubmitAssignmentVariables): MutationPromise<SubmitAssignmentData, SubmitAssignmentVariables>;

interface SubmitAssignmentRef {
  ...
  (dc: DataConnect, vars: SubmitAssignmentVariables): MutationRef<SubmitAssignmentData, SubmitAssignmentVariables>;
}
export const submitAssignmentRef: SubmitAssignmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the submitAssignmentRef:
```typescript
const name = submitAssignmentRef.operationName;
console.log(name);
```

### Variables
The `SubmitAssignment` mutation requires an argument of type `SubmitAssignmentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SubmitAssignmentVariables {
  assignmentId: UUIDString;
  url: string;
}
```
### Return Type
Recall that executing the `SubmitAssignment` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SubmitAssignmentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SubmitAssignmentData {
  submission_insert: Submission_Key;
}
```
### Using `SubmitAssignment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, submitAssignment, SubmitAssignmentVariables } from '@dataconnect/generated';

// The `SubmitAssignment` mutation requires an argument of type `SubmitAssignmentVariables`:
const submitAssignmentVars: SubmitAssignmentVariables = {
  assignmentId: ..., 
  url: ..., 
};

// Call the `submitAssignment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await submitAssignment(submitAssignmentVars);
// Variables can be defined inline as well.
const { data } = await submitAssignment({ assignmentId: ..., url: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await submitAssignment(dataConnect, submitAssignmentVars);

console.log(data.submission_insert);

// Or, you can use the `Promise` API.
submitAssignment(submitAssignmentVars).then((response) => {
  const data = response.data;
  console.log(data.submission_insert);
});
```

### Using `SubmitAssignment`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, submitAssignmentRef, SubmitAssignmentVariables } from '@dataconnect/generated';

// The `SubmitAssignment` mutation requires an argument of type `SubmitAssignmentVariables`:
const submitAssignmentVars: SubmitAssignmentVariables = {
  assignmentId: ..., 
  url: ..., 
};

// Call the `submitAssignmentRef()` function to get a reference to the mutation.
const ref = submitAssignmentRef(submitAssignmentVars);
// Variables can be defined inline as well.
const ref = submitAssignmentRef({ assignmentId: ..., url: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = submitAssignmentRef(dataConnect, submitAssignmentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.submission_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.submission_insert);
});
```

## DeleteSubmission
You can execute the `DeleteSubmission` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteSubmission(vars: DeleteSubmissionVariables): MutationPromise<DeleteSubmissionData, DeleteSubmissionVariables>;

interface DeleteSubmissionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteSubmissionVariables): MutationRef<DeleteSubmissionData, DeleteSubmissionVariables>;
}
export const deleteSubmissionRef: DeleteSubmissionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteSubmission(dc: DataConnect, vars: DeleteSubmissionVariables): MutationPromise<DeleteSubmissionData, DeleteSubmissionVariables>;

interface DeleteSubmissionRef {
  ...
  (dc: DataConnect, vars: DeleteSubmissionVariables): MutationRef<DeleteSubmissionData, DeleteSubmissionVariables>;
}
export const deleteSubmissionRef: DeleteSubmissionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteSubmissionRef:
```typescript
const name = deleteSubmissionRef.operationName;
console.log(name);
```

### Variables
The `DeleteSubmission` mutation requires an argument of type `DeleteSubmissionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteSubmissionVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteSubmission` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteSubmissionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteSubmissionData {
  submission_delete?: Submission_Key | null;
}
```
### Using `DeleteSubmission`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteSubmission, DeleteSubmissionVariables } from '@dataconnect/generated';

// The `DeleteSubmission` mutation requires an argument of type `DeleteSubmissionVariables`:
const deleteSubmissionVars: DeleteSubmissionVariables = {
  id: ..., 
};

// Call the `deleteSubmission()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteSubmission(deleteSubmissionVars);
// Variables can be defined inline as well.
const { data } = await deleteSubmission({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteSubmission(dataConnect, deleteSubmissionVars);

console.log(data.submission_delete);

// Or, you can use the `Promise` API.
deleteSubmission(deleteSubmissionVars).then((response) => {
  const data = response.data;
  console.log(data.submission_delete);
});
```

### Using `DeleteSubmission`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteSubmissionRef, DeleteSubmissionVariables } from '@dataconnect/generated';

// The `DeleteSubmission` mutation requires an argument of type `DeleteSubmissionVariables`:
const deleteSubmissionVars: DeleteSubmissionVariables = {
  id: ..., 
};

// Call the `deleteSubmissionRef()` function to get a reference to the mutation.
const ref = deleteSubmissionRef(deleteSubmissionVars);
// Variables can be defined inline as well.
const ref = deleteSubmissionRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteSubmissionRef(dataConnect, deleteSubmissionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.submission_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.submission_delete);
});
```

## UpdateGrade
You can execute the `UpdateGrade` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateGrade(vars: UpdateGradeVariables): MutationPromise<UpdateGradeData, UpdateGradeVariables>;

interface UpdateGradeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateGradeVariables): MutationRef<UpdateGradeData, UpdateGradeVariables>;
}
export const updateGradeRef: UpdateGradeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateGrade(dc: DataConnect, vars: UpdateGradeVariables): MutationPromise<UpdateGradeData, UpdateGradeVariables>;

interface UpdateGradeRef {
  ...
  (dc: DataConnect, vars: UpdateGradeVariables): MutationRef<UpdateGradeData, UpdateGradeVariables>;
}
export const updateGradeRef: UpdateGradeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateGradeRef:
```typescript
const name = updateGradeRef.operationName;
console.log(name);
```

### Variables
The `UpdateGrade` mutation requires an argument of type `UpdateGradeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateGradeVariables {
  id: UUIDString;
  grade?: number | null;
}
```
### Return Type
Recall that executing the `UpdateGrade` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateGradeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateGradeData {
  submission_update?: Submission_Key | null;
}
```
### Using `UpdateGrade`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateGrade, UpdateGradeVariables } from '@dataconnect/generated';

// The `UpdateGrade` mutation requires an argument of type `UpdateGradeVariables`:
const updateGradeVars: UpdateGradeVariables = {
  id: ..., 
  grade: ..., // optional
};

// Call the `updateGrade()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateGrade(updateGradeVars);
// Variables can be defined inline as well.
const { data } = await updateGrade({ id: ..., grade: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateGrade(dataConnect, updateGradeVars);

console.log(data.submission_update);

// Or, you can use the `Promise` API.
updateGrade(updateGradeVars).then((response) => {
  const data = response.data;
  console.log(data.submission_update);
});
```

### Using `UpdateGrade`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateGradeRef, UpdateGradeVariables } from '@dataconnect/generated';

// The `UpdateGrade` mutation requires an argument of type `UpdateGradeVariables`:
const updateGradeVars: UpdateGradeVariables = {
  id: ..., 
  grade: ..., // optional
};

// Call the `updateGradeRef()` function to get a reference to the mutation.
const ref = updateGradeRef(updateGradeVars);
// Variables can be defined inline as well.
const ref = updateGradeRef({ id: ..., grade: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateGradeRef(dataConnect, updateGradeVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.submission_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.submission_update);
});
```

## PostDiscussion
You can execute the `PostDiscussion` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
postDiscussion(vars: PostDiscussionVariables): MutationPromise<PostDiscussionData, PostDiscussionVariables>;

interface PostDiscussionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: PostDiscussionVariables): MutationRef<PostDiscussionData, PostDiscussionVariables>;
}
export const postDiscussionRef: PostDiscussionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
postDiscussion(dc: DataConnect, vars: PostDiscussionVariables): MutationPromise<PostDiscussionData, PostDiscussionVariables>;

interface PostDiscussionRef {
  ...
  (dc: DataConnect, vars: PostDiscussionVariables): MutationRef<PostDiscussionData, PostDiscussionVariables>;
}
export const postDiscussionRef: PostDiscussionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the postDiscussionRef:
```typescript
const name = postDiscussionRef.operationName;
console.log(name);
```

### Variables
The `PostDiscussion` mutation requires an argument of type `PostDiscussionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface PostDiscussionVariables {
  courseId: UUIDString;
  content: string;
}
```
### Return Type
Recall that executing the `PostDiscussion` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `PostDiscussionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface PostDiscussionData {
  discussionPost_insert: DiscussionPost_Key;
}
```
### Using `PostDiscussion`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, postDiscussion, PostDiscussionVariables } from '@dataconnect/generated';

// The `PostDiscussion` mutation requires an argument of type `PostDiscussionVariables`:
const postDiscussionVars: PostDiscussionVariables = {
  courseId: ..., 
  content: ..., 
};

// Call the `postDiscussion()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await postDiscussion(postDiscussionVars);
// Variables can be defined inline as well.
const { data } = await postDiscussion({ courseId: ..., content: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await postDiscussion(dataConnect, postDiscussionVars);

console.log(data.discussionPost_insert);

// Or, you can use the `Promise` API.
postDiscussion(postDiscussionVars).then((response) => {
  const data = response.data;
  console.log(data.discussionPost_insert);
});
```

### Using `PostDiscussion`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, postDiscussionRef, PostDiscussionVariables } from '@dataconnect/generated';

// The `PostDiscussion` mutation requires an argument of type `PostDiscussionVariables`:
const postDiscussionVars: PostDiscussionVariables = {
  courseId: ..., 
  content: ..., 
};

// Call the `postDiscussionRef()` function to get a reference to the mutation.
const ref = postDiscussionRef(postDiscussionVars);
// Variables can be defined inline as well.
const ref = postDiscussionRef({ courseId: ..., content: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = postDiscussionRef(dataConnect, postDiscussionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.discussionPost_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.discussionPost_insert);
});
```

## DeletePost
You can execute the `DeletePost` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deletePost(vars: DeletePostVariables): MutationPromise<DeletePostData, DeletePostVariables>;

interface DeletePostRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeletePostVariables): MutationRef<DeletePostData, DeletePostVariables>;
}
export const deletePostRef: DeletePostRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deletePost(dc: DataConnect, vars: DeletePostVariables): MutationPromise<DeletePostData, DeletePostVariables>;

interface DeletePostRef {
  ...
  (dc: DataConnect, vars: DeletePostVariables): MutationRef<DeletePostData, DeletePostVariables>;
}
export const deletePostRef: DeletePostRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deletePostRef:
```typescript
const name = deletePostRef.operationName;
console.log(name);
```

### Variables
The `DeletePost` mutation requires an argument of type `DeletePostVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeletePostVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeletePost` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeletePostData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeletePostData {
  discussionPost_delete?: DiscussionPost_Key | null;
}
```
### Using `DeletePost`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deletePost, DeletePostVariables } from '@dataconnect/generated';

// The `DeletePost` mutation requires an argument of type `DeletePostVariables`:
const deletePostVars: DeletePostVariables = {
  id: ..., 
};

// Call the `deletePost()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deletePost(deletePostVars);
// Variables can be defined inline as well.
const { data } = await deletePost({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deletePost(dataConnect, deletePostVars);

console.log(data.discussionPost_delete);

// Or, you can use the `Promise` API.
deletePost(deletePostVars).then((response) => {
  const data = response.data;
  console.log(data.discussionPost_delete);
});
```

### Using `DeletePost`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deletePostRef, DeletePostVariables } from '@dataconnect/generated';

// The `DeletePost` mutation requires an argument of type `DeletePostVariables`:
const deletePostVars: DeletePostVariables = {
  id: ..., 
};

// Call the `deletePostRef()` function to get a reference to the mutation.
const ref = deletePostRef(deletePostVars);
// Variables can be defined inline as well.
const ref = deletePostRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deletePostRef(dataConnect, deletePostVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.discussionPost_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.discussionPost_delete);
});
```

## UpdatePost
You can execute the `UpdatePost` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updatePost(vars: UpdatePostVariables): MutationPromise<UpdatePostData, UpdatePostVariables>;

interface UpdatePostRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdatePostVariables): MutationRef<UpdatePostData, UpdatePostVariables>;
}
export const updatePostRef: UpdatePostRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updatePost(dc: DataConnect, vars: UpdatePostVariables): MutationPromise<UpdatePostData, UpdatePostVariables>;

interface UpdatePostRef {
  ...
  (dc: DataConnect, vars: UpdatePostVariables): MutationRef<UpdatePostData, UpdatePostVariables>;
}
export const updatePostRef: UpdatePostRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updatePostRef:
```typescript
const name = updatePostRef.operationName;
console.log(name);
```

### Variables
The `UpdatePost` mutation requires an argument of type `UpdatePostVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdatePostVariables {
  id: UUIDString;
  content: string;
}
```
### Return Type
Recall that executing the `UpdatePost` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdatePostData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdatePostData {
  discussionPost_update?: DiscussionPost_Key | null;
}
```
### Using `UpdatePost`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updatePost, UpdatePostVariables } from '@dataconnect/generated';

// The `UpdatePost` mutation requires an argument of type `UpdatePostVariables`:
const updatePostVars: UpdatePostVariables = {
  id: ..., 
  content: ..., 
};

// Call the `updatePost()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updatePost(updatePostVars);
// Variables can be defined inline as well.
const { data } = await updatePost({ id: ..., content: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updatePost(dataConnect, updatePostVars);

console.log(data.discussionPost_update);

// Or, you can use the `Promise` API.
updatePost(updatePostVars).then((response) => {
  const data = response.data;
  console.log(data.discussionPost_update);
});
```

### Using `UpdatePost`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updatePostRef, UpdatePostVariables } from '@dataconnect/generated';

// The `UpdatePost` mutation requires an argument of type `UpdatePostVariables`:
const updatePostVars: UpdatePostVariables = {
  id: ..., 
  content: ..., 
};

// Call the `updatePostRef()` function to get a reference to the mutation.
const ref = updatePostRef(updatePostVars);
// Variables can be defined inline as well.
const ref = updatePostRef({ id: ..., content: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updatePostRef(dataConnect, updatePostVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.discussionPost_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.discussionPost_update);
});
```

