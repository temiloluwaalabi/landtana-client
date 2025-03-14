import { cn } from "@/lib/utils";

interface MaxWidthContainerProps {
  children: React.ReactNode;
  className?: string;
  innerClass?: string;
}

const MaxWidthContainer = ({
  children,
  className,
  innerClass,
}: MaxWidthContainerProps) => {
  return (
    <section
      className={cn(
        "px-[10px] md:px-[30px] lg:px-[40px] 2xl:px-[96px] py-[20px] md:py-[25px] lg:py-[30px] 2xl:py-[40px] overflow-hidden",
        className,
      )}
    >
      <div
        className={cn(
          "mx-auto size-full max-w-screen-xl  px-[10px] lg:px-[30px] 2xl:px-[30px]",
          innerClass,
        )}
      >
        {children}
      </div>
    </section>
  );
};

export default MaxWidthContainer;
