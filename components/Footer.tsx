import Image from "next/image";

export default function Footer() {
  return (
    <div className="w-full flex justify-center items-center">
      {/* Use layout="intrinsic" to keep the aspect ratio */}
      <Image
        src="/footer.svg"
        alt="Footer"
        layout="responsive" // Ensures responsive width and maintains aspect ratio
        width={1920}        // Set a reasonable default width
        height={1080}       // Set the corresponding height for the aspect ratio
        className="w-full h-auto" // Tailwind for additional styling
      />
    </div>
  );
}