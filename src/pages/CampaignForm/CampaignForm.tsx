import React, { ChangeEvent, useState } from "react";

import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";

import { ICampaign } from "../../models/campaign";
import Services from "../../services/Services";

import "./CampaignForm.css";

export default function CampaignForm() {
  const { register, handleSubmit, errors } = useForm();
  const [image, setPreview] = useState({ base64image: "" });

  function handleChange(event: ChangeEvent<HTMLInputElement> | null) {
    if (event?.target.files == null) {
      return;
    } else {
      setPreview({
        base64image: URL.createObjectURL(event.target.files[0]),
      });
    }
  }

  const onSubmit = (data: any) => {
    var campaign: ICampaign = {
      imgUrl: image.base64image,
      title: String(data.title),
      description: String(data.description),
      dateBegin: String(data.dateBegin),
      dateEnd: String(data.dateEnd),
    };
    Services.createCampaign(campaign);
  };

  return (
    <div id="form-component">
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
          <img src={image.base64image} id="image-preview" />
        </Form.Group>
        <Form.Group controlId="title">
          <Form.Label>2. What is the title of the campaign?</Form.Label>
          <Form.Control
            type="text"
            placeholder="Campaign's title"
            ref={register({ required: true })}
            name="title"
          />
          {errors.title && (
            <p className="error-message">
              Please, provide a Title for the Campaign
            </p>
          )}
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
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
