import { Link } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { type ComponentProps } from 'react';
import { Platform } from 'react-native';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: string };

export function ExternalLink({ href, ...rest }: Props) {
  return (
    <Link
      target="_blank"
      {...rest}
      href={href}
      onPress={async (event) => {
        if (Platform.OS !== 'web') {
          // Impedir o comportamento padrão de vincular ao navegador padrão no nativo.
          event.preventDefault();
          // Abra o link em um navegador do aplicativo.
          await openBrowserAsync(href);
        }
      }}
    />
  );
}
