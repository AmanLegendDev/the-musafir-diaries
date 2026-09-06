"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

type Props =
  | {
      multiple?: false;
      value: string;
      onChange: (url: string) => void;
    }
  | {
      multiple: true;
      value: string[];
      onChange: (urls: string[]) => void;
    };

export default function CloudinaryUploader(props: Props) {
  const isMultiple = props.multiple === true;

  return (
    <div className="space-y-4">

      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
        options={{
          multiple: isMultiple,
        }}
        onSuccess={(result: any) => {

          const url = result.info.secure_url;

          if (isMultiple) {
            props.onChange([...props.value, url]);
          } else {
            props.onChange(url);
          }

        }}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            className="rounded-xl bg-sky-600 px-5 py-3 text-white"
          >
            Upload Image
          </button>
        )}
      </CldUploadWidget>

      {!isMultiple && props.value && (
        <div className="relative h-56 w-full overflow-hidden rounded-xl border">

          <Image
            src={props.value}
            alt=""
            fill
            className="object-cover"
          />

          <button
            type="button"
            onClick={() => props.onChange("")}
            className="absolute right-2 top-2 rounded-full bg-red-600 px-2 text-white"
          >
            ✕
          </button>

        </div>
      )}

      {isMultiple && props.value.length > 0 && (

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

          {props.value.map((image, index) => (

            <div
              key={index}
              className="relative h-36 overflow-hidden rounded-xl border"
            >

              <Image
                src={image}
                alt=""
                fill
                className="object-cover"
              />

              <button
                type="button"
                onClick={() =>
                  props.onChange(
                    props.value.filter((_, i) => i !== index)
                  )
                }
                className="absolute right-2 top-2 rounded-full bg-red-600 px-2 text-white"
              >
                ✕
              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}