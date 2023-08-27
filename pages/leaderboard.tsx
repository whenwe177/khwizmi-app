import React, { useEffect } from "react";
import bg from "@/public/bg1.png";
import Logo from "@/components/Logo";
import Star from "@/components/Star";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { firestore } from "@/firebase";
import { useQuery } from "@tanstack/react-query";
import { useAppContext } from "@/context/AppContext";
import { UserAttrs } from "@/Quiz";
import GradCap from "@/components/Svg/GradCap";
import Medal from "@/components/Svg/Medal";
import University from "@/components/Svg/University";
import Book from "@/components/Svg/Book";
import Loading from "@/components/Loading";
import ErrorComponent from "@/components/Error";
import AccordionListOfQuizzes from "@/components/AccordionListOfQuizzes";

const LeaderboardPage = () => {
  const { user } = useAppContext();
  const userRef = collection(firestore, "user_attributes");
  const q = query(
    userRef,
    orderBy("experience", "desc"),
    limit(5)
  );
  const { data, isLoading, isError, isSuccess } = useQuery(["leaderboard"], {
    queryFn: async () => {
      const results = await getDocs(q);
      return results.docs.map<UserAttrs>(
        (doc) => ({ ...doc.data(), uid: doc.id } as UserAttrs)
      );
    },
  });

  

  if (isLoading) return <Loading/>;
  if (isError) return <ErrorComponent statusCode={0} message={""}/>;
  const top5 = data.slice(0,5);
  const containedInTop5 = top5.map(item => item.uid).includes(user!.uid)
  const indexOfCurrentUser = data.findIndex(mappedUser => mappedUser.uid === user?.uid);
  const currentUser = data[indexOfCurrentUser]

  return (
    <div
      style={{
        background: `url(${bg.src}), linear-gradient(180deg, #0E032F 0%, #283472 100%)`,
        backgroundSize: "cover",
      }}
      className="min-h-screen py-8 px-60 flex flex-col items-center gap-5"
    >
      <div className="flex my-12 items-center gap-3">
        <Logo className="h-[40px] w-[40px]" />
        <p className="text-white text-xl font-semibold">Khwizmi</p>
      </div>
      <h2 className="text-7xl text-white font-bold mb-5">Leaderboard</h2>
      <div className="relative w-full h-[75vh]">
        <Star className="absolute w-14 h-14 -top-5 -left-5 rotate-45 z-10" />
        <div className="flex flex-col justify-end items-center h-full bg-white drop-shadow-md rounded-2xl overflow-hidden">
          <div className="flex gap-20 w-full px-40 justify-center items-end">
            <div className="w-1/5 flex flex-col items-center gap-2">
              <div className="rounded-full w-20 h-20 overflow-hidden">
                <img
                  alt={data![1].name}
                  src={data![1].photo_url}
                  className="w-full h-full"
                />
              </div>
              <div
                className="rounded-t-[5rem] w-full h-[35vh] flex justify-end flex-col items-center py-8"
                style={{
                  background:
                    "linear-gradient(171.33deg, #DBDBDB 39.71%, #A7A6A6 102.06%)",
                }}
              >
                <p className="font-bold text-3xl">2nd</p>
                <p className="font-medium text-xl">
                  {data?.[1]?.experience} XP
                </p>
              </div>
            </div>
            <div className="w-1/5 flex flex-col items-center gap-2">
              <div className="rounded-full w-20 h-20 overflow-hidden">
                <img
                  alt={data?.[0]?.name}
                  src={data?.[0]?.photo_url}
                  className="w-full h-full"
                />
              </div>
              <div
                className="rounded-t-[5rem] w-full h-[45vh] flex justify-end flex-col items-center py-8"
                style={{
                  background:
                    "linear-gradient(172.99deg, #FFDB93 53.44%, #FEAF51 82.9%)",
                }}
              >
                <p className="font-bold text-3xl">1st</p>
                <p className="font-medium text-xl">
                  {data?.[0]?.experience} XP
                </p>
              </div>
            </div>
            <div className="w-1/5 flex flex-col items-center gap-2">
              <div className="rounded-full w-20 h-20 overflow-hidden">
                <img
                  alt={data?.[2]?.name}
                  src={data?.[2]?.photo_url}
                  className="w-full h-full"
                />
              </div>
              <div
                className="rounded-t-[5rem] w-full h-[27vh] flex justify-end flex-col items-center py-8"
                style={{
                  background:
                    "linear-gradient(170.9deg, #C5806A 39.94%, #982804 86.12%)",
                }}
              >
                <p className="font-bold text-3xl">3rd</p>
                <p className="font-medium text-xl">
                  {data?.[2]?.experience} XP
                </p>
              </div>
            </div>
          </div>
          <div className="bg-green1 h-1/6 w-full"></div>
        </div>
      </div>
      <Star width={60} height={60} style={{ rotate: "10deg" }} />
      <div
        className="border-yellow1 border-4 px-10 py-4 rounded-lg w-3/4 grid place-items-center"
        style={{
          background:
            "linear-gradient(175.83deg, #8679FF 3.4%, #0A1E86 103.73%), linear-gradient(160.17deg, #FFCC4A -37.19%, #FF884F 4.91%, #C65516 86%)",
        }}
      >
        <p className="text-3xl font-bold text-yellow1">TOP 5 SCHOLARS</p>
      </div>
      <div className="grid grid-cols-4 w-full px-10 text-white font-bold text-xl place-items-center">
        <p>Place</p>
        <p>Name</p>
        <p>XP</p>
        <p>Rank</p>
      </div>
      {top5.map((mappedUser, idx) => (
        <div
          className={`grid grid-cols-4 rounded-full w-full bg-gray-50 font-bold text-md px-10 py-6 place-items-center ${
            user?.uid === mappedUser.uid &&
            "text-yellow1 border-[3px] border-yellow1"
          }`}
          style={{
            background:
              user?.uid === mappedUser.uid
                ? "linear-gradient(175.83deg, #8679FF 3.4%, #0A1E86 103.73%)"
                : undefined,
          }}
        >
          <p>{idx + 1}</p>
          <div className="flex gap-4 items-center place-self-start">
            <div className="rounded-full w-12 h-12 overflow-hidden">
              <img
                src={mappedUser.photo_url}
                className="w-full h-ful object-cover"
              />
            </div>
            <p>{mappedUser.name}</p>
          </div>
          <p>{mappedUser.experience}</p>
          <div className="flex flex-col items-center">
            {mappedUser.experience > 200 ? (
              <>
                <GradCap
                  className="w-6 h-6"
                  fill={mappedUser.uid === user?.uid ? "#FFCF87" : "black"}
                />
                <p>Senior</p>
              </>
            ) : mappedUser.experience > 100 ? (
              <>
                <Medal
                  className="w-6 h-6"
                  fill={mappedUser.uid === user?.uid ? "#FFCF87" : "black"}
                />
                <p>Junior</p>
              </>
            ) : mappedUser.experience > 50 ? (
              <>
                <University
                  className="w-6 h-6"
                  fill={mappedUser.uid === user?.uid ? "#FFCF87" : "black"}
                />
                <p>Sophomore</p>
              </>
            ) : (
              <>
                <Book
                  className="w-6 h-6"
                  fill={mappedUser.uid === user?.uid ? "#FFCF87" : "black"}
                />
                <p>Freshman</p>
              </>
            )}
          </div>
        </div>
      ))}
      {containedInTop5 || (
        <div
        className={`grid grid-cols-4 rounded-full w-full font-bold text-md px-10 py-6 place-items-center ${
          "text-yellow1 border-[3px] border-yellow1"
        }`}
        style={{
          background:"linear-gradient(175.83deg, #8679FF 3.4%, #0A1E86 103.73%)"
        }}
      >
        <p>{indexOfCurrentUser + 1}</p>
        <div className="flex gap-4 items-center place-self-start">
          <div className="rounded-full w-12 h-12 overflow-hidden">
            <img
              src={currentUser.photo_url}
              className="w-full h-ful object-cover"
            />
          </div>
          <p>{currentUser.name}</p>
        </div>
        <p>{currentUser.experience}</p>
        <div className="flex flex-col items-center">
          {currentUser.experience > 200 ? (
            <>
              <GradCap
                className="w-6 h-6"
                fill="#FFCF87"
              />
              <p>Senior</p>
            </>
          ) : currentUser.experience > 100 ? (
            <>
              <Medal
                className="w-6 h-6"
                fill="#FFCF87"
              />
              <p>Junior</p>
            </>
          ) : currentUser.experience > 50 ? (
            <>
              <University
                className="w-6 h-6"
                fill="#FFCF87"
              />
              <p>Sophomore</p>
            </>
          ) : (
            <>
              <Book
                className="w-6 h-6"
                fill="#FFCF87"
              />
              <p>Freshman</p>
            </>
          )}
        </div>
      </div>
      )}
    </div>
  );
};

LeaderboardPage.auth = true;

export default LeaderboardPage;
