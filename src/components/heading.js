import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

interface PageHeadingProps {
  breadcrumb: {
    title: string;
    to: string;
    parent?: {
      title: string;
      to: string;
    };
  };
}

const PageHeading: React.FC<PageHeadingProps> = ({ breadcrumb }) => {
  return (
    <div className="page-heading py-[20px]  bg-white border-b border-[#e7eaec]">
      <div className="px-[10px]">
        <h2 className="text-[24px] mb-[5px]">{breadcrumb.title}</h2>
        <Breadcrumb>
          <BreadcrumbList>
            {/* Dashboard */}
            <BreadcrumbItem>
              <Link to="/dashboard">Dashboard</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            {/* Parent breadcrumb if exists */}
            {breadcrumb.parent && (
              <>
                <BreadcrumbItem>
                  <Link to={breadcrumb.parent.to}>{breadcrumb.parent.title}</Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}

            {/* Current breadcrumb */}
            <BreadcrumbItem>
              <Link to={breadcrumb.to}>{breadcrumb.title}</Link>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default PageHeading;
