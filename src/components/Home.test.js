import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./Home";

const sampleData = [
  {
    Name: "Chaitanya",
    Email: "chai@gmail.com",
    Age: "30",
    YearsOfExperience: 5,
    PositionApplied: "Full Stack Developer",
    DateOfApplication: "09/01/2024",
    StatusOfApplication: "APPROVED",
  },
  {
    Name: "Krishna",
    Email: "kri@gmail.com",
    Age: "50",
    YearsOfExperience: 10,
    PositionApplied: "SDE - 2",
    DateOfApplication: "11/12/2023",
    StatusOfApplication: "REJECTED",
  },
  {
    Name: "Chakri",
    Email: "chakri@gmail.com",
    Age: "20",
    YearsOfExperience: 2,
    PositionApplied: "SDE - 1",
    DateOfApplication: "11/12/2023",
    StatusOfApplication: "WAITING",
  },
];

jest.mock("react-router-dom", () => {
  jest.requireActual("react-router-dom");
  return {
    useNavigate: () => jest.fn(),
    useLocation: () => jest.fn(),
  };
});

test("Sort Data by YOE on clicking on Years of experience Column", () => {
  render(<Home personsData={sampleData} />);

  const header = screen.getByText("Years of experience");
  fireEvent.click(header);

  const firstRow = screen.getByText("Chakri");
  expect(firstRow).toBeInTheDocument();
});

test("Search Data by data based on Search Input", () => {
  render(<Home personsData={sampleData} />);

  const searchInput = screen.getByTestId("search");

  fireEvent.change(searchInput, { target: { value: "kri" } });
  const filteredData = screen.getByText("Chakri");
  expect(filteredData).toBeInTheDocument();
});
