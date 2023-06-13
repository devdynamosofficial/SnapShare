
import React, { useState } from 'react';

import { Account, Databases, Query } from 'appwrite';
import appwriteClient from '@/libs/appwrite';
import { useRouter } from 'next/navigation';
import { FETCH_STATUS } from '@/utils/constants';

export default function useUser() {
  const account = new Account(appwriteClient);
  const [currentAccount, setCurrentAccount] = React.useState();
  const [friendsList, setFriendsList] = React.useState();
  const [gotFriendsStatus, setGotFriendsStatus] = React.useState(
    FETCH_STATUS.LOADING
  );
  const [accountStatus, setAccountStatus] = React.useState(
    FETCH_STATUS.LOADING
  );
  const router = useRouter();

  const getSession = async () => {
    setAccountStatus(FETCH_STATUS.LOADING);

    const promise = account.get();
    let currentAccount = null;

    try {
      currentAccount = await promise;
      getFriendsList(currentAccount);
      setAccountStatus(FETCH_STATUS.SUCCESS);
    } catch (error) {
      console.log(error);
      setAccountStatus(FETCH_STATUS.FAIL);
    } finally {
      setCurrentAccount(currentAccount);
    }
  };

  const logout = async () => {
    const promise = await account.deleteSession('current');
    setCurrentAccount(null)
    router.push('/auth/signin')
  };

  const getFriendsList = async (account) =>{
    const databases = new Databases(appwriteClient);
    const promise = databases.listDocuments(process.env.NEXT_PUBLIC_DATABASE_ID, process.env.NEXT_PUBLIC_FRIENDS_COLLECTION_ID, [
      Query.equal("user_id", account.$id),
      Query.limit(100)
    ]);
    let list = null;
    try{
      list = await promise;
      setFriendsList(list.documents);
      setGotFriendsStatus(FETCH_STATUS.SUCCESS)
    } catch (error) {
      console.log(error);
      setGotFriendsStatus(FETCH_STATUS.FAIL);
    } finally {
      setFriendsList(list);
    }
  }

  React.useEffect(() => {
    getSession();
  }, []);

  return {
    currentAccount,
    isLoadingAccount: accountStatus === FETCH_STATUS.LOADING,
    logout,
    isFriendListLoaded: gotFriendsStatus == FETCH_STATUS.SUCCESS,
    friendsList
  };
}
