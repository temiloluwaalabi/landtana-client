import { cn } from "@/lib/utils";

interface MaxWidthContainerProps {
  children: React.ReactNode;
  className?: string;
}

const MaxWidthContainer = ({ children, className }: MaxWidthContainerProps) => {
  return (
    <section
      className={cn(
        "px-[20px] md:px-[30px] lg:px-[40px] 2xl:px-[96px] py-[20px] md:py-[25px] lg:py-[30px] 2xl:py-[40px] overflow-hidden",
        className
      )}
    >
      <div className="mx-auto size-full max-w-screen-xl overflow-hidden px-0 lg:px-[30px] 2xl:px-0">
        {children}
      </div>
    </section>
  );
};

export default MaxWidthContainer;
