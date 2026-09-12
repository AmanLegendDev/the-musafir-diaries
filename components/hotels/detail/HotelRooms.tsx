import {
  BedDouble,
  DoorOpen,
  Users,
} from "lucide-react";

type RoomType = {
  _id?: string;
  name: string;
  description: string;
  occupancy: string;
  bedType: string;
};

type Props = {
  roomTypes: RoomType[];
};

export default function HotelRooms({
  roomTypes,
}: Props) {
  const rooms = roomTypes.filter(
    (room) =>
      room.name?.trim() ||
      room.description?.trim() ||
      room.occupancy?.trim() ||
      room.bedType?.trim()
  );

  if (rooms.length === 0) {
    return null;
  }

  return (
    <section
      id="rooms"
      className="scroll-mt-20 bg-[#FAF9F5]"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
        {/* Header */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-[#087E8B]" />

            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#087E8B]">
              Rooms & Retreats
            </span>
          </div>

          <h2 className="mt-6 text-3xl font-semibold leading-tight tracking-[-0.03em] text-[#071A33] sm:text-4xl lg:text-5xl">
            Your space in
            <span className="text-[#087E8B]">
              {" "}
              the mountains.
            </span>
          </h2>

          <p className="mt-5 text-sm leading-7 text-[#071A33]/50 sm:text-base">
            Choose the room that fits the way you want
            to experience your stay.
          </p>
        </div>

        {/* Room list */}
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {rooms.map((room, index) => (
            <article
              key={
                room._id ||
                `${room.name}-${index}`
              }
              className="group overflow-hidden rounded-[1.75rem] border border-[#071A33]/8 bg-white transition duration-500 hover:-translate-y-0.5 hover:shadow-[0_20px_55px_rgba(7,26,51,0.08)]"
            >
              <div className="p-6 sm:p-7">
                {/* Number + title */}
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#087E8B]">
                      Room {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-[#071A33] sm:text-2xl">
                      {room.name}
                    </h3>
                  </div>

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#071A33] text-white transition group-hover:bg-[#087E8B]">
                    <DoorOpen className="h-4.5 w-4.5" />
                  </div>
                </div>

                {/* Description */}
                {room.description && (
                  <p className="mt-5 text-sm leading-6 text-[#071A33]/55">
                    {room.description}
                  </p>
                )}

                {/* Room facts */}
                <div className="mt-7 grid grid-cols-1 gap-3 border-t border-[#071A33]/8 pt-5 sm:grid-cols-2">
                  {room.occupancy && (
                    <div className="flex items-center gap-3 rounded-xl bg-[#FAF9F5] px-4 py-3">
                      <Users className="h-4 w-4 shrink-0 text-[#087E8B]" />

                      <div className="min-w-0">
                        <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#071A33]/35">
                          Occupancy
                        </p>

                        <p className="mt-0.5 truncate text-xs font-semibold text-[#071A33]">
                          {room.occupancy}
                        </p>
                      </div>
                    </div>
                  )}

                  {room.bedType && (
                    <div className="flex items-center gap-3 rounded-xl bg-[#FAF9F5] px-4 py-3">
                      <BedDouble className="h-4 w-4 shrink-0 text-[#087E8B]" />

                      <div className="min-w-0">
                        <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#071A33]/35">
                          Bed type
                        </p>

                        <p className="mt-0.5 truncate text-xs font-semibold text-[#071A33]">
                          {room.bedType}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom accent */}
              <div className="h-1 w-full bg-[#071A33]/5 transition group-hover:bg-[#087E8B]" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}