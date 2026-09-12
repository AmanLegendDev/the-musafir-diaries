import Inquiry from "@/models/Inquiry";

function randomDigits(length: number) {
  const min = 10 ** (length - 1);
  const max = 10 ** length - 1;

  return Math.floor(
    min + Math.random() * (max - min + 1),
  ).toString();
}

export async function generateInquiryNumber() {
  const year = new Date().getFullYear();

  for (let attempt = 0; attempt < 10; attempt++) {
    const inquiryNumber = `TMD-INQ-${year}-${randomDigits(6)}`;

    const exists = await Inquiry.exists({
      inquiryNumber,
    });

    if (!exists) {
      return inquiryNumber;
    }
  }

  throw new Error(
    "Unable to generate a unique inquiry number.",
  );
}