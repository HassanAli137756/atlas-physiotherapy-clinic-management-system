import React from "react";
import { 
  UserRound,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  CalendarDays,
  VenusAndMars,
  IdCard,
  User,
} from "lucide-react";
import { useSelector } from "react-redux";

function ProfileInfo({ icon: Icon, label, value }) {
  return (
    <div className="flex  min-w-0 items-start gap-3 rounded-xl border border-gray-100 bg-gray-50/70 p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-700 shadow-sm">
        <Icon size={18} />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-gray-500">
          {label}
        </p>

        <p className="mt-1 wrap-break-word text-sm font-semibold text-gray-800">
          {value || "Not provided"}
        </p>
      </div>
    </div>
  );
}

export function Profile() {
  
  const 
  {
    userData
  }
  = useSelector(state => state.userReducer.userInfo)
    

  if (!userData) return null;

  const formattedDate = userData?.createdAt
    ? new Date(userData?.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "Not available";

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

      {/* Profile Header */}
      <div className="relative bg-linear-to-r from-emerald-800 to-emerald-700 px-5 py-7 sm:px-8 sm:py-8">

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">

          {/* Avatar */}
          <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-4 border-white/30 bg-white/15 shadow-lg">
            {userData.avatar ? (
              <img
                src={userData.avatar}
                alt={userData.fullName}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-white">
                <UserRound size={42} />
              </div>
            )}
          </div>

          {/* Name and Role */}
          <div className="min-w-0 text-center sm:text-left">
            <h2 className="wrap-break-word text-2xl font-bold text-white">
              {userData.fullName}
            </h2>

            <p className="mt-1 text-sm text-emerald-100">
              @{userData.userName}
            </p>

            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5">
              <ShieldCheck size={15} className="text-emerald-100" />

              <span className="text-xs font-semibold capitalize text-white">
                {userData.role}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="p-5 sm:p-8">

        <div className="mb-5">
          <h3 className="text-lg font-bold text-gray-900">
            Personal Information
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Your personal and account details.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

          <ProfileInfo
            icon={IdCard}
            label="Profile ID"
            value={userData.userProfileId}
          />

          <ProfileInfo
            icon={User}
            label="Username"
            value={userData.userName}
          />

          <ProfileInfo
            icon={UserRound}
            label="Full Name"
            value={userData.fullName}
          />

          <ProfileInfo
            icon={Mail}
            label="Email Address"
            value={userData.email}
          />

          <ProfileInfo
            icon={Phone}
            label="Phone Number"
            value={userData.cellNo}
          />

          <ProfileInfo
            icon={MapPin}
            label="Address"
            value={userData.address}
          />

          <ProfileInfo
            icon={VenusAndMars}
            label="Gender"
            value={userData.gender}
          />

          <ProfileInfo
            icon={ShieldCheck}
            label="Account Role"
            value={userData.role}
          />

          <ProfileInfo
            icon={CalendarDays}
            label="Account Created"
            value={formattedDate}
          />

          <ProfileInfo
            icon={UserRound}
            label="Avatar"
            value={userData.avatar ? "Profile image uploaded" : "No avatar uploaded"}
          />

        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center gap-2 border-t border-gray-100 pt-5">
          <ShieldCheck size={17} className="text-emerald-700" />

          <p className="text-xs text-gray-500">
            Your profile information is associated with your clinic account.
          </p>
        </div>

      </div>
    </div>
  );
}
