import { useAppContext } from "@/app/AppProvider";
import {
  File,
  Upload,
  Search,
  Shield,
  Key,
  Database,
  Link,
  Network,
  Globe,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";

const LandingSection = () => {
  const { userId } = useAppContext();

  if (userId) {
    return null;
  }

  return (
    <div className="py-12 px-4 overflow-visible">
      <div className="max-w-4xl mx-auto text-center">
        <div className="space-y-4 mb-12">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent leading-tight tracking-tight pb-1">
            Decentralized File Storage & Sharing
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Experience the future of file storage with our decentralized
            platform. Your files are encrypted, distributed, and accessible only
            with your keys.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <FeatureCard
            icon={<Upload />}
            title="Upload & Store"
            description="Upload any file type and store it securely on the decentralized network"
          />
          <FeatureCard
            icon={<Shield />}
            title="Encrypt & Protect"
            description="All files are encrypted before being distributed across the network"
          />
          <FeatureCard
            icon={<Key />}
            title="Own Your Data"
            description="Complete control with your private keys - no central authority"
          />
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-8">
            Technical Architecture
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TechCard
              icon={<Database />}
              title="IPFS Storage"
              description="Your files are split into chunks, encrypted, and stored across the IPFS network, ensuring redundancy and availability."
              details={[
                "Content-addressed storage",
                "Distributed hash tables",
                "Peer-to-peer network",
              ]}
            />
            <TechCard
              icon={<Link />}
              title="Blockchain Integration"
              description="File metadata and access controls are managed through smart contracts, providing transparency and immutability."
              details={[
                "Smart contract verification",
                "Decentralized access control",
                "Immutable audit trail",
              ]}
            />
          </div>
        </div>

        <div className="border border-border rounded-lg p-8 bg-gradient-to-b from-background to-secondary/20 mb-16">
          <h2 className="text-2xl font-semibold mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <WorkflowStep
              number={1}
              icon={<Key />}
              title="Connect Wallet"
              description="Securely connect your Web3 wallet to access the platform"
            />
            <WorkflowStep
              number={2}
              icon={<Upload />}
              title="Upload Files"
              description="Select and upload your files with optional encryption"
            />
            <WorkflowStep
              number={3}
              icon={<Network />}
              title="IPFS Distribution"
              description="Files are distributed across the IPFS network"
            />
            <WorkflowStep
              number={4}
              icon={<Globe />}
              title="Access Anywhere"
              description="Retrieve your files from anywhere using your wallet"
            />
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">
            Why Choose Decentralized Storage?
          </h2>
          <ul className="text-left space-y-4 text-muted-foreground mb-4">
            <li className="flex items-start gap-2">
              <Shield className="h-5 w-5 mt-0.5 shrink-0" />
              <span>
                Enhanced security through encryption and distributed storage
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Database className="h-5 w-5 mt-0.5 shrink-0" />
              <span>
                No single point of failure - your files are always available
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Key className="h-5 w-5 mt-0.5 shrink-0" />
              <span>Complete ownership and control over your data</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <Card className="border-border hover:border-primary transition-all duration-300">
    <CardContent className="pt-6">
      <div className="mb-4 w-10 h-10 border border-border rounded-sm flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const TechCard = ({ icon, title, description, details }) => (
  <Card className="border-border hover:border-primary transition-all duration-300">
    <CardContent className="pt-6">
      <div className="mb-4 w-12 h-12 border border-border rounded-full flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <ul className="space-y-2">
        {details.map((detail, index) => (
          <li key={index} className="flex items-center gap-2 text-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            {detail}
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

const WorkflowStep = ({ number, icon, title, description }) => (
  <div className="text-center">
    <div className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center mx-auto mb-4 relative">
      {icon}
      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">
        {number}
      </div>
    </div>
    <h3 className="font-semibold mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

export default LandingSection;
