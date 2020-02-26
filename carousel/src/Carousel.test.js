import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

// smoke test
it("renders without crashing", function () {
  render(<Carousel />);
})

// snapshot test
it("matches snapshot", function () {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
})

it("works when you click on the right arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second, checks caption of image
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("carousel moves left when you click on the left arrow from the second image", function () {
  const { queryByTestId, queryByText } = render(<Carousel />);

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect second image to show, by checking image number listed below the image
  expect(queryByText("Image 2 of 3.")).toBeInTheDocument();

  // move backward in the carousel
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // expect first image to show
  expect(queryByText("Image 1 of 3.")).toBeInTheDocument();

})

it("does not have left arrow on first image", function () {
  const { queryByTestId } = render(<Carousel />);
  
  expect(queryByTestId("left-arrow")).toHaveClass("iconHidden");
})

it("does not have right arrow on last image", function () {
  const { queryByTestId, queryByText } = render(<Carousel />);

  // move forward in the carousel to end of image array
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow); // Is there a way to loop through this instead?
  fireEvent.click(rightArrow);

  // expect third/last image to show
  expect(queryByText("Image 3 of 3.")).toBeInTheDocument();

  expect(queryByTestId("right-arrow")).toHaveClass("iconHidden");
})


