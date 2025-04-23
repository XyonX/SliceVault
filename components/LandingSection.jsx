import { useAppContext } from "@/app/AppProvider";
import { File, Upload, Search } from "lucide-react";

const LandingSection = () => {
  return (
    <div className="py-12 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Decentralized File Storage & Sharing
        </h1>
        <p className="text-lg mb-8 text-muted-foreground">
          Store your files securely on the decentralized network. No central
          authority, just your files and your keys.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <FeatureCard
            icon={<Upload />}
            title="Upload & Store"
            description="Upload any file type and store it securely on the decentralized network"
          />
          <FeatureCard
            icon={<File />}
            title="Organize"
            description="Add descriptions and tags to keep your files organized"
          />
          <FeatureCard
            icon={<Search />}
            title="Find & Share"
            description="Quickly find your files and share them securely with others"
          />
        </div>

        <div className="border border-border p-8 rounded-sm">
          <h2 className="text-xl font-semibold mb-4">How It Works</h2>
          <ol className="text-left space-y-4">
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-secondary h-6 w-6 flex items-center justify-center text-sm font-medium mt-0.5">
                1
              </div>
              <div>
                <strong className="font-medium">Connect your wallet</strong>
                <p className="text-muted-foreground">
                  Connect securely with your Web3 wallet to access your account
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-secondary h-6 w-6 flex items-center justify-center text-sm font-medium mt-0.5">
                2
              </div>
              <div>
                <strong className="font-medium">Upload your files</strong>
                <p className="text-muted-foreground">
                  Add descriptions and tags to help organize your content
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-secondary h-6 w-6 flex items-center justify-center text-sm font-medium mt-0.5">
                3
              </div>
              <div>
                <strong className="font-medium">Access anywhere</strong>
                <p className="text-muted-foreground">
                  Your files are available to you anywhere with your wallet
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="border border-border rounded-sm p-6 hover:border-primary transition-colors">
    <div className="mb-4 w-10 h-10 border border-border rounded-sm flex items-center justify-center">
      {icon}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

export default LandingSection;
