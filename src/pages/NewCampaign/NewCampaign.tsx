import React, { ChangeEvent, useState } from "react";

import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";

import { ICampaign } from "../../models/campaign";
import Services from "../../services/Services";

import "./NewCampaign.css";

export default function NewCampaign() {
  const { register, handleSubmit, errors } = useForm();
  const [image, setPreview] = useState({ imagePreview: "" });

  const toBase64 = (fileList: FileList) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(fileList[0]);
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  function handleChange(event: ChangeEvent<HTMLInputElement> | null) {
    if (event?.target.files == null) {
      return;
    } else {
      setPreview({
        imagePreview: URL.createObjectURL(event.target.files[0]),
      });
    }
  }

  interface ISubmitNewCampaign {
    image: FileList;
    title: any;
    description: any;
    dateBegin: any;
    dateEnd: any;
  }

  const onSubmit = async (data: ISubmitNewCampaign) => {
    var campaign: ICampaign = {
      imgUrl: String(await toBase64(data.image)),
      title: String(data.title).trim(),
      description: String(data.description).trim(),
      dateBegin: String(data.dateBegin),
      dateEnd: String(data.dateEnd),
    };
    Services.createCampaign(campaign).then(() => history.back());
  };

  return (
    <div id="form-component">
      <h2>Create a new Campaign</h2>
      <br />
      <Form onSubmit={handleSubmit(onSubmit)} id="new-campaign">
        <Form.Group controlId="image">
          <Form.Label>1. Which Hero is starring in this campaign?</Form.Label>
          <input
            type="file"
            onChange={(changeEvent) => handleChange(changeEvent)}
            name="image"
            ref={register}
            accept="image/x-png,image/gif,image/jpeg"
          />
          <img src={image.imagePreview} id="image-preview" />
        </Form.Group>
        <Form.Group controlId="title">
          <Form.Label>2. What is the title of the campaign?</Form.Label>
          <Form.Control
            type="text"
            placeholder="Campaign's title"
            ref={register({ required: true })}
            name="title"
            className="form-field"
          />
          {errors.title && (
            <p className="error-message">
              Please, provide a Title for the Campaign
            </p>
          )}
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>3. Write a brief description of the campaign</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Write the description of the Campaign"
            name="description"
            ref={register({ required: true })}
          />
          {errors.title && (
            <p className="error-message">You must provide a description</p>
          )}
        </Form.Group>
        <Form.Group controlId="dateBegin">
          <Form.Label>Begin Date</Form.Label>
          <Form.Control
            type="date"
            name="dateBegin"
            ref={register({ required: true })}
            className="form-field"
          />
          {errors.title && (
            <p className="error-message">
              Please insert the campaign starting date
            </p>
          )}
        </Form.Group>
        <Form.Group controlId="dateEnd">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            name="dateEnd"
            ref={register({ required: true })}
            className="form-field"
          />
          {errors.title && (
            <p className="error-message">
              Please insert the campaign ending date
            </p>
          )}
        </Form.Group>
        <div id="submit-button">
          <Button color="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}
