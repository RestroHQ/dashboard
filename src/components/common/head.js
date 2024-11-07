const defaults = {
  title: "RestroHQ  — All your restaurant needs, in one place.",
  description: "All your restaurant needs, in one place.",
};

export default function Head({ title, description }) {
  title = title ? `${title} — RestroHQ` : defaults.title;
  description = description || defaults.description;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
    </>
  );
}
