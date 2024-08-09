const page = () => {
  return (
    <div className="w-full container mx-auto px-6 lg:px-20">
      <div className="relative grid grid-rows-[auto,1fr,auto] min-h-[600px] items-center py-12 lg:grid-rows-[auto,1fr,auto] lg:py-24 xl:min-h-[700px]">
        <div className="container  flex flex-col gap-4 text-center md:gap-10 mx-auto w-fit">
          <div className="">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Privacy Policy
            </h1>
          </div>
          <div className="mx-auto space-y-4 text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxe">
            <p>
              Your privacy is important to us. It is our policy to respect your
              privacy regarding any information we may collect from you across
              our website.
            </p>
          </div>
        </div>
        <div className="container mx-auto mt-[32px]">
          <div className="grid gap-4 md:gap-6 lg:gap-8">
            <div className="">
              <h2 className="text-[16px] font-semibold tracking-wide uppercase">
                Introduction
              </h2>
              <p className="text-sm md:text-base text-[#7f7f7f]">
                Welcome to Nexusnova. We respect your privacy and are committed
                to protecting your personal data. This privacy policy will
                inform you about how we look after your personal data when you
                visit our website (regardless of where you visit it from) and
                tell you about your privacy rights and how the law protects you.
              </p>
            </div>
            <div className="">
              <h2 className="text-[16px] font-semibold tracking-wide uppercase">
                Important Information and Who We Are Purpose of this Privacy
                Policy
              </h2>
              <p className="text-sm md:text-base text-[#7f7f7f]">
                This privacy policy aims to give you information on how [Your
                Company Name] collects and processes your personal data through
                your use of this website, including any data you may provide
                through this website when you sign up for our newsletter,
                purchase a product or service, or take part in a competition.
              </p>
            </div>
            <div className="">
              <h2 className="text-[16px] font-semibold tracking-wide uppercase">
                Retention of Your Personal Data
              </h2>
              <p className="text-sm md:text-base text-[#7f7f7f]">
                The Company will retain Your Personal Data only for as long as
                is necessary for the purposes set out in this Privacy Policy. We
                will retain and use Your Personal Data to the extent necessary
                to comply with our legal obligations (for example, if we are
                required to retain your data to comply with applicable laws),
                resolve disputes, and enforce our legal agreements and policies.
                <br /> <br />
                Includes details about payments to and from you and other
                details of products and services you have purchased from us.
              </p>
            </div>
            <div className="">
              <h2 className="text-[16px] font-semibold tracking-wide uppercase">
                Information Collection
              </h2>
              <p className="text-sm md:text-base text-[#7f7f7f]">
                We only ask for personal information when we truly need it to
                provide a service to you. We collect it by fair and lawful
                means, with your knowledge and consent. We also let you know why
                we’re collecting it and how it will be used.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
