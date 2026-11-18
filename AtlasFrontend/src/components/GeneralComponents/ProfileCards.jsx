import { Plus, UserRoundCheck, } from "lucide-react"
import React from "react"
import { data, useNavigate } from "react-router-dom"



function ProfileCards(
  {
    profiles = [],
    header="",
    message=""
  }) {

  const navigate = useNavigate();

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm xl:col-span-2">




      <div className="flex items-center justify-between border-b border-gray-100 p-5">
        
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            {header}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {message}
          </p>
          <br />

          <div className="flex justify-start">
            <span className="
                  inline-flex items-center gap-1.5
                  px-2.5 py-1.5
                  rounded-full
                  bg-emerald-50
                  text-emerald-700
                  text-xs font-semibold
                ">
              {profiles.length} Profiles
            </span>
          </div>
        </div>

        
        
      </div>
      <div className="divide-y divide-gray-100">
        {profiles.length > 0 ? profiles.map((profile) => {
          
          return (
            <div
              key={profile?._id}
              className="flex flex-col gap-4 p-5 transition hover:bg-gray-50/60 sm:flex-row sm:items-center sm:justify-between"
            >
              
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  {
                    profile?.patientAccount?.avatar ?
                      <img 
                      className="rounded-full w-15 h-15"
                      src={profile?.patientAccount?.avatar} alt="Err" />
                      :
                      <UserRoundCheck className="h-5 w-5" />
                  }


                </div>

                <div>
                  <div className="flex justify-start">

                    <h3 className="font-semibold text-gray-900">
                      {profile?.name}
                    </h3>
                  </div>

                    <div className="flex justify-start">
                      <p className="mt-0.5 text-sm text-gray-500">
                        {profile?.cellNo}
                      </p>
                    </div>


                  <div className="flex justify-start">
                    <p className="mt-0.5 text-sm text-gray-500">
                      {profile?.patientAccount?.email}
                    </p>
                  </div>

                </div>
              </div>

              <div className="grid grid-cols-1">
                
                <div className="grid grid-cols-1">

                      <div>
                        <br />
                        <div className="flex justify-end">
                          <div className="flex justify-between gap-5">
                            <button
                              onClick={() => navigate("/book-appointment", {
                                state: 
                                {
                                  
                                    profileId: profile?._id,
                                    fullName: profile?.name,
                                    email: profile?.patientAccount?.email,
                                    cellNo: profile?.cellNo,
                                  
                                }
                              })}
                              type="button"
                              className="
                            inline-flex items-center justify-center gap-2
                            px-4 py-2.5
                            rounded-xl
                            bg-emerald-700
                            text-white
                            text-sm font-semibold
                            shadow-sm
                            hover:bg-emerald-800
                            active:bg-emerald-900
                            active:scale-[0.98]
                            focus:outline-none
                            focus:ring-2
                            focus:ring-emerald-200
                            transition
                          "
                            >
                              <Plus size={18} />
                              Book
                            </button>
                          </div>
                        </div>
                      </div>

                </div>
              </div>
            </div>
          )
        }) :
          <p className="font-semibold p-2">
            There is no profile founded.
          </p>
        }
      </div>
    </section>

  )
}

export {ProfileCards}