import { jobInterfaceFull } from "@/interfaces/interfaces";

export function filterJobsByCompany(
  jobs: jobInterfaceFull[],
  searchTerm: string
): jobInterfaceFull[] {
  return jobs.filter((job) =>
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );
}
