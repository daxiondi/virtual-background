import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import BlockIcon from '@material-ui/icons/Block'
import BlurOnIcon from '@material-ui/icons/BlurOn'
import { Background, backgroundImageUrls } from '../helpers/backgroundHelper'
import ImageButton from './ImageButton'
import SelectionIconButton from './SelectionIconButton'

type BackgroundSelectionCardProps = {
  background: Background
  onChange: (background: Background) => void
}

function BackgroundSelectionCard(props: BackgroundSelectionCardProps) {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="h6" component="h2">
          Background
        </Typography>
        <SelectionIconButton
          active={props.background.type === 'none'}
          onClick={() => props.onChange({ type: 'none' })}
        >
          <BlockIcon />
        </SelectionIconButton>
        <SelectionIconButton
          active={props.background.type === 'blur'}
          onClick={() => props.onChange({ type: 'blur' })}
        >
          <BlurOnIcon />
        </SelectionIconButton>
        {backgroundImageUrls.map((imageUrl) => (
          <ImageButton
            key={imageUrl}
            imageUrl={imageUrl}
            active={imageUrl === props.background.url}
            onClick={() => props.onChange({ type: 'image', url: imageUrl })}
          />
        ))}
      </CardContent>
    </Card>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
    },
  })
)

export default BackgroundSelectionCard
