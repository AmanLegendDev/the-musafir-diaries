"use client";
import CloudinaryUploader from "@/components/admin/shared/CloudinaryUploader";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AddDestinationPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const [bestTime, setBestTime] = useState("");
  const [altitude, setAltitude] = useState("");

 const [heroImage, setHeroImage] = useState<string>("");
const [gallery, setGallery] = useState<string[]>([]);


const [startingPrice, setStartingPrice] = useState(0);

const [duration, setDuration] = useState("");

const [rating, setRating] = useState(5);

const [reviewCount, setReviewCount] = useState(0);

const [featured, setFeatured] = useState(false);

const [featuredOrder, setFeaturedOrder] = useState(0);


  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");

  const [status, setStatus] = useState("active");

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{
    name?: string;
    country?: string;
  }>({});

  function generateSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-");
}

useEffect(() => {
  setSlug(generateSlug(name));
}, [name]);

function validate() {
  const newErrors: {
    name?: string;
    country?: string;
  } = {};

  if (!name.trim()) {
    newErrors.name = "Destination name is required.";
  }

  if (!country.trim()) {
    newErrors.country = "Country is required.";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
}

async function handleSubmit(
  e: React.FormEvent<HTMLFormElement>
) {
  e.preventDefault();

  if (!validate()) return;

  try {
    setLoading(true);

    const response = await fetch("/api/destinations", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        slug,
        shortDescription,
        description,
        country,
        state,
        city,
        bestTime,
        altitude,
        heroImage,
        gallery,

        startingPrice,
duration,
rating,
reviewCount,
featured,
featuredOrder,

        seoTitle,
        seoDescription,
        status,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.message || "Something went wrong.");
      return;
    }

    alert("Destination Created Successfully!");

    router.push("/admin/destinations");

    router.refresh();

  } catch (error) {

    console.error(error);

    alert("Server Error");

  } finally {

    setLoading(false);

  }
}

return (
<div className="mx-auto max-w-6xl space-y-8">

<div>

<Link
href="/admin/destinations"
className="text-sm font-medium text-sky-700 hover:underline"
>
← Back to Destinations
</Link>

<h1 className="mt-3 text-4xl font-bold">
Add New Destination
</h1>

<p className="mt-2 text-slate-500">
Create a destination that can be used in travel packages.
</p>

</div>

<div className="rounded-3xl border bg-white shadow-sm">

<div className="border-b px-8 py-6">

<h2 className="text-xl font-semibold">
Destination Information
</h2>

<p className="mt-1 text-sm text-slate-500">
Fill all destination information.
</p>

</div>

<form
onSubmit={handleSubmit}
className="space-y-8 p-8"
><section>

<h3 className="mb-5 text-lg font-semibold">
Basic Details
</h3>

<div className="grid gap-6 md:grid-cols-2">

<div>

<label className="mb-2 block text-sm font-medium">
Destination Name *
</label>

<input
type="text"
value={name}
onChange={(e)=>setName(e.target.value)}
placeholder="Shimla"
className="w-full rounded-xl border px-4 py-3"
/>

{errors.name && (
<p className="mt-2 text-sm text-red-600">
{errors.name}
</p>
)}

</div>

<div>

<label className="mb-2 block text-sm font-medium">
Slug
</label>

<input
type="text"
value={slug}
readOnly
className="w-full rounded-xl border bg-slate-100 px-4 py-3"
/>

</div>

</div>
<div className="mt-8 grid gap-6 md:grid-cols-3">

<div>

<label className="mb-2 block text-sm font-medium">
Country *
</label>

<input
type="text"
value={country}
onChange={(e)=>setCountry(e.target.value)}
placeholder="India"
className="w-full rounded-xl border px-4 py-3"
/>

{errors.country && (
<p className="mt-2 text-sm text-red-600">
{errors.country}
</p>
)}

</div>

<div>

<label className="mb-2 block text-sm font-medium">
State
</label>

<input
type="text"
value={state}
onChange={(e)=>setState(e.target.value)}
placeholder="Himachal Pradesh"
className="w-full rounded-xl border px-4 py-3"
/>

</div>

<div>

<label className="mb-2 block text-sm font-medium">
City
</label>

<input
type="text"
value={city}
onChange={(e)=>setCity(e.target.value)}
placeholder="Shimla"
className="w-full rounded-xl border px-4 py-3"
/>

</div>

</div>

</section>
<section>

  <h3 className="mb-5 text-lg font-semibold">
    Destination Description
  </h3>

  <div className="space-y-6">

    <div>

      <label className="mb-2 block text-sm font-medium">
        Short Description
      </label>

      <textarea
        rows={3}
        value={shortDescription}
        onChange={(e) => setShortDescription(e.target.value)}
        placeholder="Short introduction about the destination..."
        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-600"
      />

    </div>

    <div>

      <label className="mb-2 block text-sm font-medium">
        Full Description
      </label>

      <textarea
        rows={8}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Complete destination description..."
        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-600"
      />

    </div>

  </div>

</section>
<section>

  <h3 className="mb-5 text-lg font-semibold">
    Travel Information
  </h3>

  <div className="grid gap-6 md:grid-cols-2">

    <div>

      <label className="mb-2 block text-sm font-medium">
        Best Time To Visit
      </label>

      <input
        type="text"
        value={bestTime}
        onChange={(e) => setBestTime(e.target.value)}
        placeholder="March - June"
        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-600"
      />

    </div>

    <div>

      <label className="mb-2 block text-sm font-medium">
        Altitude
      </label>

      <input
        type="text"
        value={altitude}
        onChange={(e) => setAltitude(e.target.value)}
        placeholder="2200 m"
        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-600"
      />

    </div>

  </div>

</section>
<section>

  <h3 className="mb-5 text-lg font-semibold">
    Images
  </h3>

  <div className="space-y-6">

    <div>

      <label className="mb-2 block text-sm font-medium">
        Hero Image URL
      </label>

     <CloudinaryUploader
multiple={false}
value={heroImage}
onChange={setHeroImage}
/>

    </div>

    <div>

      <label className="mb-2 block text-sm font-medium">
        Gallery Images
      </label>

    <CloudinaryUploader
multiple
value={gallery}
onChange={setGallery}
/>

    </div>

  </div>

</section>

<section>

  <h3 className="mb-5 text-lg font-semibold">
    Homepage Settings
  </h3>

  <div className="grid gap-6 md:grid-cols-2">

    <div>

      <label className="mb-2 block text-sm font-medium">
        Starting Price (₹)
      </label>

      <input
        type="number"
        value={startingPrice}
        onChange={(e) =>
          setStartingPrice(Number(e.target.value))
        }
        className="w-full rounded-xl border border-slate-300 px-4 py-3"
      />

    </div>

    <div>

      <label className="mb-2 block text-sm font-medium">
        Duration
      </label>

      <input
        type="text"
        placeholder="5 Days / 4 Nights"
        value={duration}
        onChange={(e) =>
          setDuration(e.target.value)
        }
        className="w-full rounded-xl border border-slate-300 px-4 py-3"
      />

    </div>

    <div>

      <label className="mb-2 block text-sm font-medium">
        Rating
      </label>

      <input
        type="number"
        min={0}
        max={5}
        step={0.1}
        value={rating}
        onChange={(e) =>
          setRating(Number(e.target.value))
        }
        className="w-full rounded-xl border border-slate-300 px-4 py-3"
      />

    </div>

    <div>

      <label className="mb-2 block text-sm font-medium">
        Review Count
      </label>

      <input
        type="number"
        value={reviewCount}
        onChange={(e) =>
          setReviewCount(Number(e.target.value))
        }
        className="w-full rounded-xl border border-slate-300 px-4 py-3"
      />

    </div>

  </div>

  <div className="mt-6 grid gap-6 md:grid-cols-2">

    <div>

      <label className="mb-2 block text-sm font-medium">
        Featured Order
      </label>

      <input
        type="number"
        value={featuredOrder}
        onChange={(e) =>
          setFeaturedOrder(Number(e.target.value))
        }
        className="w-full rounded-xl border border-slate-300 px-4 py-3"
      />

    </div>

    <div className="flex items-end">

      <label className="flex items-center gap-3">

        <input
          type="checkbox"
          checked={featured}
          onChange={(e) =>
            setFeatured(e.target.checked)
          }
        />

        <span className="font-medium">
          Show On Homepage
        </span>

      </label>

    </div>

  </div>

</section>


<section>

  <h3 className="mb-5 text-lg font-semibold">
    SEO Information
  </h3>

  <div className="space-y-6">

    <div>

      <label className="mb-2 block text-sm font-medium">
        SEO Title
      </label>

      <input
        type="text"
        value={seoTitle}
        onChange={(e) => setSeoTitle(e.target.value)}
        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-600"
      />

    </div>

    <div>

      <label className="mb-2 block text-sm font-medium">
        SEO Description
      </label>

      <textarea
        rows={4}
        value={seoDescription}
        onChange={(e) => setSeoDescription(e.target.value)}
        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-600"
      />

    </div>

  </div>

</section>
<section>

  <h3 className="mb-5 text-lg font-semibold">
    Status
  </h3>

  <select
    value={status}
    onChange={(e) => setStatus(e.target.value)}
    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-600"
  >
    <option value="active">
      Active
    </option>

    <option value="inactive">
      Inactive
    </option>

  </select>

</section>
<div className="flex justify-end gap-4 border-t border-slate-200 pt-8">

  <Link
    href="/admin/destinations"
    className="rounded-xl border border-slate-300 px-6 py-3 font-medium transition hover:bg-slate-100"
  >
    Cancel
  </Link>

  <button
    type="submit"
    disabled={loading}
    className="rounded-xl bg-sky-700 px-6 py-3 font-semibold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-60"
  >
    {loading
      ? "Creating Destination..."
      : "Save Destination"}
  </button>

</div>

</form>

</div>

</div>
);
}
