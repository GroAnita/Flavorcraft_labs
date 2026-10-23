'use client';

import { useId, useState, type KeyboardEvent } from 'react';
import { X } from 'lucide-react';
import type { RecipeFormSectionProps } from '@/app/types/recipeForm';
import { RecipeFormSection } from '@/app/components/features/RecipeFormSection';
import { Badge } from '@/app/components/ui/Badge';
import { ROW_INPUT_CLASSES } from '@/app/components/ui/EditableRowList';

// The filters compare tags in lowercase, so "Gluten-free" matches the
// "diet:gluten-free" filter in recipeFilters.ts. "Healthy" has no filter yet.
export const SUGGESTED_TAGS = [
  'Vegetarian',
  'Vegan',
  'Gluten-free',
  'Lactose-free',
  'Quick',
  'Healthy',
];

const MAX_TAG_LENGTH = 30;

const normalize = (tag: string) => tag.trim().toLowerCase();

const TAG_BUTTON_CLASSES =
  'flex max-w-full cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

export function RecipeFormTags({ values, onChange }: RecipeFormSectionProps) {
  const id = useId();
  const inputId = `${id}-input`;
  const messageId = `${id}-message`;
  const { tags } = values;
  const [draft, setDraft] = useState('');
  const [message, setMessage] = useState('');

  const hasTag = (tag: string) =>
    tags.some((existing) => normalize(existing) === normalize(tag));

  const customTags = tags.filter(
    (tag) =>
      !SUGGESTED_TAGS.some(
        (suggested) => normalize(suggested) === normalize(tag),
      ),
  );

  function toggleSuggested(tag: string) {
    onChange({
      tags: hasTag(tag)
        ? tags.filter((existing) => normalize(existing) !== normalize(tag))
        : [...tags, tag],
    });
  }

  function addCustomTag() {
    const text = draft.trim();
    if (!text) return;

    if (hasTag(text)) {
      setMessage(`“${text}” is already added.`);
      return;
    }

    // Typing a suggested tag selects it, so it keeps the same spelling as the filters
    const suggested = SUGGESTED_TAGS.find(
      (tag) => normalize(tag) === normalize(text),
    );
    onChange({ tags: [...tags, suggested ?? text] });
    setDraft('');
    setMessage('');
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    // Enter adds the tag instead of sending the form
    if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
      event.preventDefault();
      addCustomTag();
    }
  }

  function removeTag(tag: string) {
    onChange({ tags: tags.filter((existing) => existing !== tag) });
  }

  return (
    <RecipeFormSection
      title="Tags"
      description="Tags help people find your recipe with the filters."
    >
      <div className="flex flex-col gap-6">
        <ul role="list" className="flex flex-wrap gap-2">
          {SUGGESTED_TAGS.map((tag) => {
            const selected = hasTag(tag);
            return (
              <li key={tag} className="flex max-w-full">
                <button
                  type="button"
                  aria-pressed={selected}
                  onClick={() => toggleSuggested(tag)}
                  className={TAG_BUTTON_CLASSES}
                >
                  <Badge variant="tag" size="md" selected={selected}>
                    {tag}
                  </Badge>
                </button>
              </li>
            );
          })}

          {customTags.map((tag) => (
            <li key={tag} title={tag} className="flex max-w-full">
              <button
                type="button"
                aria-label={`Remove tag ${tag}`}
                onClick={() => removeTag(tag)}
                className={TAG_BUTTON_CLASSES}
              >
                <Badge variant="tag" size="md" selected>
                  {tag}
                  <X
                    aria-hidden="true"
                    className="ml-1 inline size-3.5 align-middle"
                  />
                </Badge>
              </button>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-2">
          <label htmlFor={inputId} className="text-sm text-truffle-500">
            Add your own tag
          </label>
          <div className="flex gap-3">
            <input
              id={inputId}
              type="text"
              placeholder="E.g. Italian"
              maxLength={MAX_TAG_LENGTH}
              value={draft}
              onChange={(event) => {
                setDraft(event.target.value);
                setMessage('');
              }}
              onKeyDown={handleKeyDown}
              aria-describedby={message ? messageId : undefined}
              className={`${ROW_INPUT_CLASSES} min-w-0 flex-1`}
            />
            <button
              type="button"
              onClick={addCustomTag}
              className="inline-flex shrink-0 cursor-pointer items-center rounded-lg bg-olive-500 px-4 text-sm font-semibold text-salt-50 transition-colors hover:bg-olive-700"
            >
              Add
            </button>
          </div>
          <p
            id={messageId}
            aria-live="polite"
            className="text-xs text-nori-400 empty:hidden"
          >
            {message}
          </p>
        </div>
      </div>
    </RecipeFormSection>
  );
}
