// MODULE

// PROPS TYPE
type ButtonProps = {
  title: string;
  event: any;
  width: any;
  styles: string;
};

const Button: React.FC<ButtonProps> = ({ title, event, styles, width }) => {
  return (
    <>
      <div className={styles} onClick={event} style={{ width: width }}>
        {title}
      </div>
    </>
  );
};

export default Button;
