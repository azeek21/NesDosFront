import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";

export default function TodoById() {
  const router = useRouter();

  return <h1>Todo by id </h1>;
}

export const getServerSideProps: GetServerSideProps = async ({
  res,
  params,
  req,
}) => {
  if (!params || !params.id) {
    return {
      notFound: true,
    };
  }

  const id = Number(params.id);

  if (isNaN(id)) {
    return {
      notFound: true,
    };
  }

  let todo: any;
  try {
    todo = await getTodo(id);
  } catch (error) {
    console.error(error);
  }
  return {
    notFound: true,
  };
};
