import { FormControlLabel, Radio } from "@material-ui/core";
import React from "react";
import { GENDER_OPTIONS } from "src/constants/employee";

export const GenderLabels = GENDER_OPTIONS
  .map((gender, index) => (
      <FormControlLabel
          id={gender}
          key={index}
          value={gender}
          control={<Radio />}
          label={gender}
      />)
  )