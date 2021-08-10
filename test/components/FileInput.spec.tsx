
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import FileInput from "../../src/components/FileInput";
import { Form, Formik } from "formik";
import { Button } from "@chakra-ui/react";
import { act } from "react-dom/test-utils";




describe("FileInput", () => {
  let mockFile: File | null;
  const setInputFile = (file: File) => {
    mockFile = file;
  }
  beforeEach(() => {
    mockFile = null;
    render(<Formik initialValues={{}} onSubmit={() => { }} >
      <Form>
        <FileInput label="label" name="name" setInputFile={setInputFile} />
        <Button type='submit'>submit</Button>
      </Form>
    </Formik>)
  })
  it('should be rendered', () => {
    const { getByTestId, getByText } = screen
    expect(getByTestId('fileInput')).toBeDefined();
    expect(getByText('label')).toBeDefined();
  })

  it('should be able to set upload file', async () => {

    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });

    const fileSelect = screen.getByTestId('fileSelect');
    await waitFor(() => {
      fireEvent.change(fileSelect, {
        target: {
          files: [file]
        }
      })
    })
    expect(file).toEqual(mockFile)
  })

  it('should raise error when not file is selected', async () => {

    const submitButton = await screen.findByText('submit');
    act(async () => {
      fireEvent.click(submitButton);
      const label = await screen.findByText('label') as HTMLLabelElement;
      expect(label).toHaveAttribute('data-focus')
    })

  })



});
