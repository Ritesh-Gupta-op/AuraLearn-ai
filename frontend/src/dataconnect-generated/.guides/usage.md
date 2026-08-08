# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useCreateUserData, useDeleteUser, useUpdateUser, useGetCurrentUser, useListAllUsers, useCreateCourse, useDeleteCourse, useUpdateCourse, useGetCourse, useListCourses } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useCreateUserData();

const { data, isPending, isSuccess, isError, error } = useDeleteUser();

const { data, isPending, isSuccess, isError, error } = useUpdateUser(updateUserVars);

const { data, isPending, isSuccess, isError, error } = useGetCurrentUser();

const { data, isPending, isSuccess, isError, error } = useListAllUsers();

const { data, isPending, isSuccess, isError, error } = useCreateCourse(createCourseVars);

const { data, isPending, isSuccess, isError, error } = useDeleteCourse(deleteCourseVars);

const { data, isPending, isSuccess, isError, error } = useUpdateCourse(updateCourseVars);

const { data, isPending, isSuccess, isError, error } = useGetCourse(getCourseVars);

const { data, isPending, isSuccess, isError, error } = useListCourses();

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createUserData, deleteUser, updateUser, getCurrentUser, listAllUsers, createCourse, deleteCourse, updateCourse, getCourse, listCourses } from '@dataconnect/generated';


// Operation CreateUserData: 
const { data } = await CreateUserData(dataConnect);

// Operation DeleteUser: 
const { data } = await DeleteUser(dataConnect);

// Operation UpdateUser:  For variables, look at type UpdateUserVars in ../index.d.ts
const { data } = await UpdateUser(dataConnect, updateUserVars);

// Operation GetCurrentUser: 
const { data } = await GetCurrentUser(dataConnect);

// Operation ListAllUsers: 
const { data } = await ListAllUsers(dataConnect);

// Operation CreateCourse:  For variables, look at type CreateCourseVars in ../index.d.ts
const { data } = await CreateCourse(dataConnect, createCourseVars);

// Operation DeleteCourse:  For variables, look at type DeleteCourseVars in ../index.d.ts
const { data } = await DeleteCourse(dataConnect, deleteCourseVars);

// Operation UpdateCourse:  For variables, look at type UpdateCourseVars in ../index.d.ts
const { data } = await UpdateCourse(dataConnect, updateCourseVars);

// Operation GetCourse:  For variables, look at type GetCourseVars in ../index.d.ts
const { data } = await GetCourse(dataConnect, getCourseVars);

// Operation ListCourses: 
const { data } = await ListCourses(dataConnect);


```