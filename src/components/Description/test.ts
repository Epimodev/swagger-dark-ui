import * as utils from './utils';

// tslint:disable max-line-length
const descriptionWithoutScript = `
<p>Search all Giphy GIFs for a word or phrase. Punctuation will be stripped and ignored. Use a plus or url encode for phrases.</p>
<p>Examples:</p>
<p><a href="http://api.giphy.com/v1/gifs/search?q=paul+rudd&api_key=dc6zaTOxFJmzC" target="_blank">paul+rudd</a></p>
<p><a href="http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=dc6zaTOxFJmzC" target="_blank">ryan+gosling</a></p>
<p><a href="http://api.giphy.com/v1/gifs/search?q=american+psycho&api_key=dc6zaTOxFJmzC" target="_blank">american+psycho</a></p>
<p><a href="http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC&limit=1&offset=0" target="_blank">funny+cat</a></p>
`;
const descriptionWithOneScript = `
<p>Search all Giphy GIFs for a word or phrase. Punctuation will be stripped and ignored. Use a plus or url encode for phrases.</p>
<p>Examples:</p>
<p><a href="http://api.giphy.com/v1/gifs/search?q=paul+rudd&api_key=dc6zaTOxFJmzC" target="_blank">paul+rudd</a></p>
<script>alert('code injected')</script>
<p><a href="http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=dc6zaTOxFJmzC" target="_blank">ryan+gosling</a></p>
<p><a href="http://api.giphy.com/v1/gifs/search?q=american+psycho&api_key=dc6zaTOxFJmzC" target="_blank">american+psycho</a></p>
<p><a href="http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC&limit=1&offset=0" target="_blank">funny+cat</a></p>
`;
const descriptionWithOneScriptFixed = `
<p>Search all Giphy GIFs for a word or phrase. Punctuation will be stripped and ignored. Use a plus or url encode for phrases.</p>
<p>Examples:</p>
<p><a href="http://api.giphy.com/v1/gifs/search?q=paul+rudd&api_key=dc6zaTOxFJmzC" target="_blank">paul+rudd</a></p>
alert('code injected')
<p><a href="http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=dc6zaTOxFJmzC" target="_blank">ryan+gosling</a></p>
<p><a href="http://api.giphy.com/v1/gifs/search?q=american+psycho&api_key=dc6zaTOxFJmzC" target="_blank">american+psycho</a></p>
<p><a href="http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC&limit=1&offset=0" target="_blank">funny+cat</a></p>
`;
const descriptionWithSeveralScripts = `
<p>Search all Giphy GIFs for a word or phrase. Punctuation will be stripped and ignored. Use a plus or url encode for phrases.</p>
<p>Examples:</p>
<p><a href="http://api.giphy.com/v1/gifs/search?q=paul+rudd&api_key=dc6zaTOxFJmzC" target="_blank">paul+rudd</a></p>
<script>alert('code injected')</script>
<p><a href="http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=dc6zaTOxFJmzC" target="_blank">ryan+gosling</a></p>
<p><a href="http://api.giphy.com/v1/gifs/search?q=american+psycho&api_key=dc6zaTOxFJmzC" target="_blank">american+psycho</a></p>
<script>alert('code injected')</script>
<p><a href="http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC&limit=1&offset=0" target="_blank">funny+cat</a></p>
`;
const descriptionWithSeveralScriptsFixed = `
<p>Search all Giphy GIFs for a word or phrase. Punctuation will be stripped and ignored. Use a plus or url encode for phrases.</p>
<p>Examples:</p>
<p><a href="http://api.giphy.com/v1/gifs/search?q=paul+rudd&api_key=dc6zaTOxFJmzC" target="_blank">paul+rudd</a></p>
alert('code injected')
<p><a href="http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=dc6zaTOxFJmzC" target="_blank">ryan+gosling</a></p>
<p><a href="http://api.giphy.com/v1/gifs/search?q=american+psycho&api_key=dc6zaTOxFJmzC" target="_blank">american+psycho</a></p>
alert('code injected')
<p><a href="http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC&limit=1&offset=0" target="_blank">funny+cat</a></p>
`;

describe('getBaseUrl', () => {
  test('Should return the description without updated', () => {
    expect(utils.removeScriptTags(descriptionWithoutScript)).toBe(descriptionWithoutScript);
  });
  test('Should remove 1 script tag', () => {
    expect(utils.removeScriptTags(descriptionWithOneScript)).toBe(descriptionWithOneScriptFixed);
  });
  test('Should remove several scripts tag', () => {
    expect(utils.removeScriptTags(descriptionWithSeveralScripts)).toBe(
      descriptionWithSeveralScriptsFixed,
    );
  });
});
