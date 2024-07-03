const getData = async () => {
  try {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=5",
      {
        next: {
          revalidate: 3000,
        },
      },
    );
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function Report() {
  const data = await getData();
  console.log("dummy data", data);
  return (
    <div className="flex flex-col space-y-3">
      {data.map((item: any) => (
        <div key={item.id}>
          <h1>{item.body}</h1>
        </div>
      ))}
    </div>
  );
}
