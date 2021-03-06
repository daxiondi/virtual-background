import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { ChangeEvent } from 'react'
import {
  InputResolution,
  Pipeline,
  SegmentationConfig,
  SegmentationModel,
} from '../helpers/segmentationHelper'

type SegmentationConfigCardProps = {
  config: SegmentationConfig
  onChange: (segmentationConfig: SegmentationConfig) => void
}

function SegmentationConfigCard(props: SegmentationConfigCardProps) {
  const classes = useStyles()

  function handleModelChange(event: ChangeEvent<{ value: unknown }>) {
    const model = event.target.value as SegmentationModel
    let inputResolution = props.config.inputResolution
    if (model === 'meet' && inputResolution === '360p') {
      inputResolution = '144p'
    }
    let pipeline = props.config.pipeline
    if (model === 'bodyPix' && pipeline === 'webgl2') {
      pipeline = 'canvas2dCpu'
    }
    props.onChange({ ...props.config, model, inputResolution, pipeline })
  }

  function handleInputResolutionChange(event: ChangeEvent<{ value: unknown }>) {
    props.onChange({
      ...props.config,
      inputResolution: event.target.value as InputResolution,
    })
  }

  function handlePipelineChange(event: ChangeEvent<{ value: unknown }>) {
    props.onChange({
      ...props.config,
      pipeline: event.target.value as Pipeline,
    })
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="h6" component="h2">
          Segmentation
        </Typography>
        <FormControl className={classes.formControl} variant="outlined">
          <InputLabel>Model</InputLabel>
          <Select
            label="Model"
            value={props.config.model}
            onChange={handleModelChange}
          >
            <MenuItem value="meet">Meet</MenuItem>
            <MenuItem value="bodyPix">BodyPix</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl} variant="outlined">
          <InputLabel>Input resolution</InputLabel>
          <Select
            label="Input resolution"
            value={props.config.inputResolution}
            onChange={handleInputResolutionChange}
          >
            <MenuItem value="360p" disabled={props.config.model === 'meet'}>
              360p
            </MenuItem>
            <MenuItem value="144p">144p</MenuItem>
            <MenuItem value="96p">96p</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl} variant="outlined">
          <InputLabel>Pipeline</InputLabel>
          <Select
            label="Pipeline"
            value={props.config.pipeline}
            onChange={handlePipelineChange}
          >
            <MenuItem
              value="webgl2"
              disabled={props.config.model === 'bodyPix'}
            >
              WebGL 2 (WIP)
            </MenuItem>
            <MenuItem value="canvas2dCpu">Canvas 2D + CPU</MenuItem>
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.only('md')]: {
        gridColumnStart: 2,
        gridRowStart: 2,
      },
    },
    formControl: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      marginRight: theme.spacing(2),
      minWidth: 120,
    },
  })
)

export default SegmentationConfigCard
