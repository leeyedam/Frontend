import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import useCheckIsLastIdx from 'hooks/state/post/peopleNumArr/useCheckIsLastIdx'
import useCheckIsMax from 'hooks/state/post/peopleNumArr/useCheckIsMax'
import useCheckPart from 'hooks/state/post/peopleNumArr/useCheckPart'
import { PEOPLENUM, RECRUITMENT_PART, TEXT } from 'lib/constants'
import {
    pushPeopleNumObj,
    setPeopleNum,
    setPeopleNumRecruitPart,
    splicePeopleNumObj,
} from 'src/store/features/post/postCreateSlice'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import {
    muiMenuItemStyleObj,
    muiSelectMenuPropsObj,
    muiSelectStyleObj,
} from 'src/styles/mui/custom'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import PlaceHolderComponent from './common/PlaceHolderComponent'

const PeopleNumSelectComponentLayout = styled.div`
    display: flex;
    align-items: center;
    padding-top: 16px;
`

const OperatorButton = styled.button`
    border: none;
    cursor: pointer;
    width: 20px;
    height: 20px;
    margin-right: 10px;
`
const PlusButton = styled(OperatorButton)`
    background: center / cover no-repeat url('/assets/images/plus.svg');
`
const MinusButton = styled(OperatorButton)`
    background: center / cover no-repeat url('/assets/images/minus.svg');
`

interface PeopleNumSelectComponentProps {
    id: string
}

function PeopleNumSelectComponent({ id }: PeopleNumSelectComponentProps) {
    const dispatch = useAppDispatch()
    const peopleNumArr = useAppSelector(
        (state) => state.postCreateReducer.peopleNumArr
    )
    const isLastIdx = useCheckIsLastIdx(id)
    const isMax = useCheckIsMax()
    const { isFrontEndSet, isBackEndSet, isDesignerSet, isPmSet, isMobileSet } =
        useCheckPart()

    function handleRecruitPartChange(e: SelectChangeEvent<string>) {
        dispatch(
            setPeopleNumRecruitPart({
                id,
                part: e.target.value,
            })
        )
    }

    function handlePeopleNumChange(e: SelectChangeEvent<string>) {
        dispatch(
            setPeopleNum({
                id,
                num: Number(e.target.value),
            })
        )
    }

    function handlePeopleNumPlusClick() {
        if (peopleNumArr.length === 5) return
        // 프론트엔드, 백엔드, 디자이너, PM, 모바일 총 5가지 파트 이외 추가 불가
        dispatch(pushPeopleNumObj({ id: uuidv4(), part: '', num: null }))
    }

    function handlePeopleNumMinusClick() {
        dispatch(splicePeopleNumObj(id))
    }
    return (
        <PeopleNumSelectComponentLayout>
            <FormControl
                sx={{ m: '0', marginRight: '10px', minWidth: 100 }}
                size="small"
                id="peopleNumRecruitPart-label"
            >
                <Select
                    sx={muiSelectStyleObj}
                    MenuProps={muiSelectMenuPropsObj}
                    id="peopleNumRecruitPartSelect"
                    displayEmpty
                    defaultValue=""
                    aria-labelledby="peopleNumRecruitPart-label"
                    onChange={handleRecruitPartChange}
                >
                    <MenuItem value="" disabled>
                        <PlaceHolderComponent text={TEXT.PLACEHOLDER_CHOICE} />
                    </MenuItem>
                    {RECRUITMENT_PART.map((item) => {
                        return (
                            <MenuItem
                                sx={muiMenuItemStyleObj}
                                value={item.value}
                                key={item.title}
                                disabled={
                                    (isFrontEndSet &&
                                        item.title === '프론트엔드') ||
                                    (isBackEndSet && item.title === '백엔드') ||
                                    (isDesignerSet &&
                                        item.title === '디자이너') ||
                                    (isPmSet && item.title === 'PM') ||
                                    (isMobileSet && item.title === '모바일')
                                }
                            >
                                {item.title}
                            </MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            <FormControl
                sx={{ m: 0, marginRight: '10px', minWidth: 100 }}
                size="small"
                id="PeopleNum-label"
            >
                <Select
                    id="peopleNumSelect"
                    sx={muiSelectStyleObj}
                    MenuProps={muiSelectMenuPropsObj}
                    displayEmpty
                    defaultValue=""
                    aria-labelledby="PeopleNum-label"
                    onChange={handlePeopleNumChange}
                >
                    <MenuItem value="" disabled>
                        <PlaceHolderComponent text={TEXT.PLACEHOLDER_CHOICE} />
                    </MenuItem>
                    {PEOPLENUM.map((item) => {
                        return (
                            <MenuItem
                                sx={muiMenuItemStyleObj}
                                value={item.value}
                                key={item.title}
                            >
                                {item.title}
                            </MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            {isLastIdx ? (
                isMax ? (
                    ''
                ) : (
                    <PlusButton onClick={handlePeopleNumPlusClick} />
                )
            ) : (
                <MinusButton onClick={handlePeopleNumMinusClick} />
            )}
        </PeopleNumSelectComponentLayout>
    )
}

export default PeopleNumSelectComponent
