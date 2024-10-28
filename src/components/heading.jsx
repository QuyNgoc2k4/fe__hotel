import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
interface PageHeadingProps{
  Breadcrumb:{
    title: string,
    route: string,
  }
}

const PageHeading: React.FC<PageHeadingProps> = ({breadcrumb}) => {
  return (
    <>
      <div className="page-heading py-[20px] bg-white border-b border-[#e7eaec]">
        <div className="px-[10px]">
          <h2 className="text-[24px] mb-[5px]">{breadcrumb.title}</h2>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={breadcrumb.route}>
                  {breadcrumb.title}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    </>
  );
};
export default PageHeading;
