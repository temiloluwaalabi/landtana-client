import { cn } from "@/lib/utils";

interface MaxWidthContainerProps {
  children: React.ReactNode;
  className?: string;
}

const MaxWidthContainer = ({ children, className }: MaxWidthContainerProps) => {
  return (
    <section
      className={cn(
        "px-[20px] md:px-[30px] lg:px-[60px] 2xl:px-[116px] py-[20px] md:py-[25px] lg:py-[30px] 2xl:py-[40px] ",
        className,
      )}
    >
      <div className="mx-auto size-full max-w-screen-lg 2xl:max-w-screen-xl">
        {children}
      </div>
    </section>
  );
};

export default MaxWidthContainer;
