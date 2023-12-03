import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { images, stables } from "../../../../constants";

import { useEffect, useState } from "react";
import Pagination from "../../../../components/Pagination";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { deleteUser, getAllUsers } from "../../../../services/index/users";
import { GoUnverified, GoVerified } from "react-icons/go";

let isFirstRun = true;

const ManageUsers = () => {
  const queryClient = useQueryClient();
  const userState = useSelector((state) => state.user);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tokenAdmin = userState.userInfo.token;

  //console.log("token admin:", tokenAdmin);

  const {
    data: usersData,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryFn: () =>
      getAllUsers({ searchKeyword, page: currentPage, token: tokenAdmin }),
    queryKey: ["users"],
  });
  //console.log("token admin:", tokenAdmin);
  //console.log(searchKeyword);
  //console.log("this is data in mgruser page: ", usersData);

  const { mutate: mutateDeleteUser, isLoading: isLoadingDeleteUser } =
    useMutation({
      mutationFn: ({ _id, token }) => {
        return deleteUser({
          _id,
          token,
        });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["users"]);
        toast.success("User is deleted");
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  useEffect(() => {
    if (isFirstRun) {
      isFirstRun = false;
      return;
    }
    refetch();
  }, [refetch, currentPage]);

  const searchKeywordHandler = (e) => {
    const { value } = e.target;
    setSearchKeyword(value);
  };

  const submitSearchKeywordHandler = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    refetch();
  };

  const deleteUserHandler = ({ _id, token }) => {
    mutateDeleteUser({ _id, token });
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold">Mange Users</h1>

      <div className="w-full px-4 mx-auto">
        <div className="py-8">
          <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
            <h2 className="text-2xl leading-tight">Users</h2>
            <div className="text-end">
              <form
                onSubmit={submitSearchKeywordHandler}
                className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0"
              >
                <div className=" relative ">
                  <input
                    type="text"
                    id='"form-subscribe-Filter'
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="enter name or email"
                    onChange={searchKeywordHandler}
                    value={searchKeyword}
                  />
                </div>
                <button
                  className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                  type="submit"
                >
                  Filter
                </button>
              </form>
            </div>
          </div>
          <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Avatar
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-10 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Verify
                    </th>
                    <th
                      scope="col"
                      className="px-12 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-10 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading || isFetching ? (
                    <tr>
                      <td colSpan={5} className="text-center py-10 w-full">
                        Loading...
                      </td>
                    </tr>
                  ) : usersData?.data?.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-10 w-full">
                        No users found
                      </td>
                    </tr>
                  ) : (
                    usersData?.data.map((user) => (
                      <tr key={user?._id}>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <a href="/" className="relative block">
                                <img
                                  src={
                                    user?.avatar
                                      ? stables.UPLOAD_FOLDER_BASE_URL +
                                        user?.avatar
                                      : images.samplePostImage
                                  }
                                  alt={user.name}
                                  className="mx-auto object-cover rounded-lg w-10 aspect-square"
                                />
                              </a>
                            </div>
                          </div>
                        </td>

                        <td className="px-2 py-5 text-sm bg-white border-b border-gray-200">
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {user.name}
                            </p>
                          </div>
                        </td>
                        <td className="px-2 py-5 text-sm bg-white border-b border-gray-200">
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {user.email}
                            </p>
                          </div>
                        </td>
                        <td className="px-10 py-5 text-sm bg-white border-b border-gray-200">
                          <div className="ml-3">
                            <p
                              className={`text-gray-900 whitespace-no-wrap ${
                                user.verified
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {user.verified ? (
                                <GoVerified className="h-6 w-6 text-green-500" />
                              ) : (
                                <GoUnverified className="h-6 w-6 text-yellow-400" />
                              )}
                            </p>
                          </div>
                        </td>

                        <td className="px-10 py-5 text-sm bg-white border-b border-gray-200">
                          <div className="ml-3">
                            <p
                              className={`text-gray-900 whitespace-no-wrap ${
                                user.admin ? "text-green-600" : "text-blue-400"
                              }`}
                            >
                              {user.admin ? "Admin" : "User"}
                            </p>
                          </div>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 ">
                          {user.admin ? (
                            <div>
                              <Link
                                to={`/admin/users/manage/edit/${user?._id}`}
                                className="text-green-600 hover:text-green-900 flex justify-around"
                              >
                                Edit
                              </Link>
                            </div>
                          ) : (
                            <div className="space-x-5">
                              <button
                                disabled={isLoadingDeleteUser}
                                type="button"
                                className="text-red-600 hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed"
                                onClick={() => {
                                  deleteUserHandler({
                                    _id: user?._id,
                                    token: userState.userInfo.token,
                                  });
                                }}
                              >
                                Delete
                              </button>
                              <Link
                                to={`/admin/users/manage/edit/${user?._id}`}
                                className="text-green-600 hover:text-green-900"
                              >
                                Edit
                              </Link>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              {!isLoading && usersData && (
                <Pagination
                  onPageChange={(page) => setCurrentPage(page)}
                  currentPage={currentPage}
                  totalPageCount={JSON.parse(
                    usersData.headers["x-totalpagecount"]
                  )}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
