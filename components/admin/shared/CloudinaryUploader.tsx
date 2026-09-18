"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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

type CloudinaryInfo = {
  secure_url?: string;
  public_id?: string;
};

export default function CloudinaryUploader(props: Props) {
  const isMultiple = props.multiple === true;

  const [uploading, setUploading] = useState(false);

  /*
   * IMPORTANT:
   * React props can be stale when Cloudinary fires multiple
   * onSuccess events very quickly.
   *
   * This ref always contains the latest gallery array.
   */
  const galleryRef = useRef<string[]>([]);

  /*
   * Keep ref synchronized with the parent's current value.
   */
  useEffect(() => {
    if (isMultiple) {
      galleryRef.current = props.value;
    }
  }, [isMultiple, props.value]);

  const handleSuccess = (result: any) => {
    const info = result?.info as CloudinaryInfo | undefined;

    const url = info?.secure_url;

    if (!url) {
      console.error(
        "Cloudinary upload completed but secure_url is missing.",
        result,
      );
      return;
    }

    /*
     * HERO
     * Only one image is allowed.
     */
    if (!isMultiple) {
      props.onChange(url);
      setUploading(false);
      return;
    }

    /*
     * GALLERY
     *
     * DO NOT use props.value here.
     *
     * Cloudinary can fire multiple success events before React
     * has re-rendered the component.
     *
     * galleryRef always has the latest uploaded images.
     */
    const currentGallery = galleryRef.current;

    /*
     * Prevent duplicate URLs.
     */
    if (currentGallery.includes(url)) {
      return;
    }

    const updatedGallery = [
      ...currentGallery,
      url,
    ];

    /*
     * Update ref immediately.
     * This is the important part.
     */
    galleryRef.current = updatedGallery;

    /*
     * Update React state in parent.
     */
    props.onChange(updatedGallery);
  };

  const handleRemoveGalleryImage = (indexToRemove: number) => {
    if (!isMultiple) return;

    const updatedGallery = galleryRef.current.filter(
      (_, index) => index !== indexToRemove,
    );

    galleryRef.current = updatedGallery;

    props.onChange(updatedGallery);
  };

  return (
    <div className="space-y-5">
      <CldUploadWidget
        uploadPreset={
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
        }
        options={{
          multiple: isMultiple,
          maxFiles: isMultiple ? 20 : 1,
          resourceType: "image",
        }}
        onOpen={() => {
          setUploading(true);
        }}
        onSuccess={handleSuccess}
        onError={(error: any) => {
          console.error("Cloudinary upload error:", error);
          setUploading(false);
        }}
        onClose={() => {
          setUploading(false);
        }}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            disabled={uploading}
            className="
              inline-flex
              items-center
              justify-center
              rounded-xl
              bg-sky-600
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition
              hover:bg-sky-700
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {uploading
              ? "Uploading..."
              : isMultiple
                ? "Upload Gallery Images"
                : "Upload Image"}
          </button>
        )}
      </CldUploadWidget>

      {/* =====================================================
          HERO IMAGE
      ===================================================== */}

      {!isMultiple && props.value && (
        <div
          className="
            relative
            h-64
            w-full
            overflow-hidden
            rounded-2xl
            border
            border-slate-200
            bg-slate-100
          "
        >
          <Image
            src={props.value}
            alt="Destination hero image"
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover"
          />

          <button
            type="button"
            onClick={() => props.onChange("")}
            aria-label="Remove hero image"
            className="
              absolute
              right-3
              top-3
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-red-600
              text-sm
              font-bold
              text-white
              shadow-lg
              transition
              hover:bg-red-700
            "
          >
            ×
          </button>
        </div>
      )}

      {/* =====================================================
          GALLERY
      ===================================================== */}

      {isMultiple && (
        <div className="space-y-4">
          {/* Gallery Header */}

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Gallery Images
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Upload multiple images for this destination.
              </p>
            </div>

            <div
              className="
                rounded-full
                bg-slate-100
                px-3
                py-1
                text-xs
                font-medium
                text-slate-600
              "
            >
              {props.value.length}{" "}
              {props.value.length === 1
                ? "image"
                : "images"}
            </div>
          </div>

          {/* Gallery Images */}

          {props.value.length > 0 ? (
            <div
              className="
                grid
                grid-cols-2
                gap-4
                sm:grid-cols-3
                lg:grid-cols-4
              "
            >
              {props.value.map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className="
                    group
                    relative
                    aspect-[4/3]
                    overflow-hidden
                    rounded-2xl
                    border
                    border-slate-200
                    bg-slate-100
                  "
                >
                  <Image
                    src={image}
                    alt={`Destination gallery image ${index + 1}`}
                    fill
                    sizes="
                      (max-width: 640px) 50vw,
                      (max-width: 1024px) 33vw,
                      25vw
                    "
                    className="
                      object-cover
                      transition-transform
                      duration-500
                      group-hover:scale-105
                    "
                  />

                  {/* Bottom label */}

                  <div
                    className="
                      absolute
                      inset-x-0
                      bottom-0
                      bg-gradient-to-t
                      from-black/60
                      to-transparent
                      px-3
                      pb-3
                      pt-8
                    "
                  >
                    <span className="text-xs font-medium text-white">
                      Image {index + 1}
                    </span>
                  </div>

                  {/* Remove */}

                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveGalleryImage(index)
                    }
                    aria-label={`Remove gallery image ${
                      index + 1
                    }`}
                    className="
                      absolute
                      right-2
                      top-2
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      bg-red-600
                      text-sm
                      font-bold
                      text-white
                      opacity-0
                      shadow-lg
                      transition
                      group-hover:opacity-100
                      focus:opacity-100
                      hover:bg-red-700
                    "
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */

            <div
              className="
                rounded-2xl
                border
                border-dashed
                border-slate-300
                bg-slate-50
                px-6
                py-10
                text-center
              "
            >
              <p className="text-sm font-medium text-slate-600">
                No gallery images uploaded yet.
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Select multiple images at once or upload them
                one by one.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}