"use client";
import { Pagination } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaginationClient({ totalPages }: { totalPages: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/all-pets?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  // তৈরি করা হবে HeroUI v3 এর স্ট্রাকচার অনুযায়ী
  const pageItems = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex w-full justify-center mt-10">
      <div className="inline-block">
        <Pagination>
        <Pagination.Content>
          {/* Previous Button */}
          <Pagination.Item>
            <Pagination.Previous 
              isDisabled={currentPage === 1}
              onPress={() => handlePageChange(currentPage - 1)}
            >
              <Pagination.PreviousIcon />
              <span>Previous</span>
            </Pagination.Previous>
          </Pagination.Item>

          {/* Page Numbers */}
          {pageItems.map((page) => (
            <Pagination.Item key={page}>
              <Pagination.Link 
                isActive={page === currentPage}
                onPress={() => handlePageChange(page)}
              >
                {page}
              </Pagination.Link>
            </Pagination.Item>
          ))}

          {/* Next Button */}
          <Pagination.Item>
            <Pagination.Next 
              isDisabled={currentPage === totalPages}
              onPress={() => handlePageChange(currentPage + 1)}
            >
              <span>Next</span>
              <Pagination.NextIcon />
            </Pagination.Next>
          </Pagination.Item>
        </Pagination.Content>
      </Pagination>
      </div>
    </div>
  );
}